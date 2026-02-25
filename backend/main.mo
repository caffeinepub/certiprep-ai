import Time "mo:core/Time";
import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Set "mo:core/Set";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Types
  type CertificationId = Text;
  type DomainId = Nat;
  type ObjectiveId = Nat;
  type QuestionId = Nat;
  type TestId = Nat;
  type KeyTermId = Nat;
  type PortId = Nat;
  type ProtocolId = Nat;
  type FlashcardId = Nat;

  // Content Types
  type Domain = {
    domainId : DomainId;
    certificationId : CertificationId;
    domainName : Text;
    description : Text;
    subdomains : [Text];
  };

  type Objective = {
    objectiveId : ObjectiveId;
    domainId : DomainId;
    description : Text;
    difficulty : Nat;
  };

  type KeyTerm = {
    id : KeyTermId;
    term : Text;
    definition : Text;
  };

  type Port = {
    id : PortId;
    portNumber : Nat;
    protocol : Text;
    service : Text;
    description : Text;
  };

  type Protocol = {
    id : ProtocolId;
    name : Text;
    description : Text;
    port : ?Nat;
  };

  type Acronym = {
    acronym : Text;
    meaning : Text;
  };

  // Practice/Test Types
  type Question = {
    id : QuestionId;
    certificationId : CertificationId;
    domain : Text;
    questionText : Text;
    correctAnswer : Text;
  };

  type TestResult = {
    testId : TestId;
    certificationId : CertificationId;
    score : Nat;
    totalQuestions : Nat;
    timestamp : Time.Time;
  };

  type Flashcard = {
    id : FlashcardId;
    front : Text;
    back : Text;
    timesCorrect : Nat;
    timesIncorrect : Nat;
  };

  // State
  var nextDomainId = 0;
  var nextObjectiveId = 0;
  var nextTestId = 0;
  var nextKeyTermId = 0;
  var nextPortId = 0;
  var nextProtocolId = 0;
  var nextFlashcardId = 0;
  var nextQuestionId = 0;

  let domains = Map.empty<DomainId, Domain>();
  let objectives = Map.empty<ObjectiveId, Objective>();
  let keyTerms = Map.empty<KeyTermId, KeyTerm>();
  let ports = Map.empty<PortId, Port>();
  let protocols = Map.empty<ProtocolId, Protocol>();
  let certifications = Set.empty<Text>();

  let questions = Map.empty<QuestionId, Question>();
  let testResults = Map.empty<TestId, TestResult>();
  let flashcards = Map.empty<Text, List.List<Flashcard>>();

  module TestResult {
    public func compareByTimestamp(a : TestResult, b : TestResult) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  // Content Storage (Domains, Objectives, etc.)
  public shared ({ caller }) func addDomain(certName : Text, name : Text, description : Text, subdomains : [Text]) : async DomainId {
    certifications.add(certName);
    let domain : Domain = {
      domainId = nextDomainId;
      certificationId = certName;
      domainName = name;
      description;
      subdomains;
    };
    domains.add(nextDomainId, domain);
    nextDomainId += 1;
    domain.domainId;
  };

  public shared ({ caller }) func addObjective(domainId : DomainId, description : Text, difficulty : Nat) : async ObjectiveId {
    let objective : Objective = {
      objectiveId = nextObjectiveId;
      domainId;
      description;
      difficulty;
    };
    objectives.add(nextObjectiveId, objective);
    nextObjectiveId += 1;
    objective.objectiveId;
  };

  public shared ({ caller }) func addKeyTerm(term : Text, definition : Text) : async KeyTermId {
    let k : KeyTerm = {
      id = nextKeyTermId;
      term;
      definition;
    };
    keyTerms.add(nextKeyTermId, k);
    nextKeyTermId += 1;
    k.id;
  };

  public shared ({ caller }) func addPort(portNumber : Nat, protocol : Text, service : Text, description : Text) : async PortId {
    let port : Port = {
      id = nextPortId;
      portNumber;
      protocol;
      service;
      description;
    };
    ports.add(nextPortId, port);
    nextPortId += 1;
    port.id;
  };

  public shared ({ caller }) func addProtocol(name : Text, description : Text, port : ?Nat) : async ProtocolId {
    let prot : Protocol = {
      id = nextProtocolId;
      name;
      description;
      port;
    };
    protocols.add(nextProtocolId, prot);
    nextProtocolId += 1;
    prot.id;
  };

  // Question & Test Handling
  public shared ({ caller }) func addQuestion(certificationId : CertificationId, domain : Text, questionText : Text, correctAnswer : Text) : async QuestionId {
    let q : Question = {
      id = nextQuestionId;
      certificationId;
      domain;
      questionText;
      correctAnswer;
    };
    questions.add(nextQuestionId, q);
    nextQuestionId += 1;
    q.id;
  };

  public query ({ caller }) func getQuestionsForCertification(certificationId : CertificationId) : async [Question] {
    let questionsArray = questions.values().toArray();
    questionsArray.filter(
      func(q) {
        q.certificationId == certificationId;
      }
    );
  };

  public shared ({ caller }) func submitTestResult(certificationId : CertificationId, score : Nat, totalQuestions : Nat) : async TestId {
    let result : TestResult = {
      testId = nextTestId;
      certificationId;
      score;
      totalQuestions;
      timestamp = Time.now();
    };
    testResults.add(nextTestId, result);
    nextTestId += 1;
    result.testId;
  };

  public query ({ caller }) func getTestResultsForCertification(certificationId : CertificationId) : async [TestResult] {
    let filteredResults = testResults.values().toArray().filter(
      func(result) {
        result.certificationId == certificationId;
      }
    );
    filteredResults.sort(TestResult.compareByTimestamp);
  };

  public shared ({ caller }) func addFlashcard(certificationId : CertificationId, front : Text, back : Text) : async () {
    let newCard : Flashcard = {
      id = nextFlashcardId;
      front;
      back;
      timesCorrect = 0;
      timesIncorrect = 0;
    };
    let existingList = switch (flashcards.get(certificationId)) {
      case (null) { List.empty<Flashcard>() };
      case (?list) { list };
    };
    existingList.add(newCard);
    flashcards.add(certificationId, existingList);
  };

  public query ({ caller }) func getFlashcards(certificationId : CertificationId) : async [Flashcard] {
    switch (flashcards.get(certificationId)) {
      case (null) { Runtime.trap("No flashcards found for that certification") };
      case (?list) { list.toArray() };
    };
  };

  // Data Fetch Functions
  public query ({ caller }) func getDomains(certificationId : CertificationId) : async [Domain] {
    let allDomains = domains.values().toArray();
    allDomains.filter(
      func(domain) {
        domain.certificationId == certificationId;
      }
    );
  };

  public query ({ caller }) func getObjectives(domainId : DomainId) : async [Objective] {
    let allObjectives = objectives.values().toArray();
    allObjectives.filter(
      func(objective) {
        objective.domainId == domainId;
      }
    );
  };

  public query ({ caller }) func getKeyTerms() : async [KeyTerm] {
    keyTerms.values().toArray();
  };

  public query ({ caller }) func getPorts() : async [Port] {
    ports.values().toArray();
  };

  public query ({ caller }) func getProtocols() : async [Protocol] {
    protocols.values().toArray();
  };

  public query ({ caller }) func getCertifications() : async [Text] {
    certifications.toArray();
  };
};
