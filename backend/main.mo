import Time "mo:core/Time";
import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Set "mo:core/Set";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import UserApproval "user-approval/approval";
import MixinStorage "blob-storage/Mixin";

// Use migration function for upgrade

actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let approvalState = UserApproval.initState(accessControlState);

  // File management support (not used downstream in this implementation)
  include MixinStorage();

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

  // User Profile
  type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

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

  // PDF progress record
  type PDFProgressRecord = {
    userId : Principal;
    certificationId : CertificationId;
    percentage : Nat;
  };

  module TestResult {
    public func compare(a : TestResult, b : TestResult) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

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
  // testResults keyed by (userId, testId) composite key stored as "principalText-testId"
  let testResults = Map.empty<TestId, TestResult>();
  // Per-user test results: userId -> List of TestIds
  let userTestResults = Map.empty<Principal, List.List<TestId>>();
  let flashcards = Map.empty<Text, List.List<Flashcard>>();

  // Store (userId, certificationId) -> percentage
  let pdfProgressRecords = Map.empty<Text, PDFProgressRecord>();

  // Helper: check if caller is approved or admin
  func isApprovedOrAdmin(caller : Principal) : Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  // User Approval Functions
  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can view profiles");
    };
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // PDF Progress methods
  public shared ({ caller }) func saveOrUpdateProgress(certificationId : CertificationId, percentage : Nat) : async () {
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can save reading progress");
    };
    if (percentage > 100) {
      Runtime.trap("PDF Reading Percentage cannot exceed 100");
    };

    let key = caller.toText() # "-" # certificationId;
    let record : PDFProgressRecord = {
      userId = caller;
      certificationId;
      percentage;
    };
    pdfProgressRecords.add(key, record);
  };

  public query ({ caller }) func getAllPdfProgressRecords() : async [PDFProgressRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all PDF progress records");
    };
    pdfProgressRecords.values().toArray();
  };

  public query ({ caller }) func getMyPdfProgressRecords() : async [PDFProgressRecord] {
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can view their reading progress");
    };
    let allRecords = pdfProgressRecords.values().toArray();
    allRecords.filter(
      func(record : PDFProgressRecord) : Bool {
        record.userId == caller;
      }
    );
  };

  // Content Storage - Admin only
  public shared ({ caller }) func addDomain(certName : Text, name : Text, description : Text, subdomains : [Text]) : async DomainId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add domains");
    };
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add objectives");
    };
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add key terms");
    };
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add ports");
    };
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add protocols");
    };
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add questions");
    };
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
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can access questions");
    };
    let questionsArray = questions.values().toArray();
    questionsArray.filter(
      func(q : Question) : Bool {
        q.certificationId == certificationId;
      }
    );
  };

  public shared ({ caller }) func submitTestResult(certificationId : CertificationId, score : Nat, totalQuestions : Nat) : async TestId {
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can submit test results");
    };
    let result : TestResult = {
      testId = nextTestId;
      certificationId;
      score;
      totalQuestions;
      timestamp = Time.now();
    };
    testResults.add(nextTestId, result);
    // Track which test results belong to this user
    let existingList = switch (userTestResults.get(caller)) {
      case (null) { List.empty<TestId>() };
      case (?list) { list };
    };
    existingList.add(nextTestId);
    userTestResults.add(caller, existingList);
    nextTestId += 1;
    result.testId;
  };

  // Returns only the caller's test results for a given certification
  public query ({ caller }) func getTestResultsForCertification(certificationId : CertificationId) : async [TestResult] {
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can view test results");
    };
    let callerTestIds = switch (userTestResults.get(caller)) {
      case (null) { return [] };
      case (?list) { list };
    };
    let callerResults = callerTestIds.toArray().filterMap(
      func(tid : TestId) : ?TestResult {
        switch (testResults.get(tid)) {
          case (null) { null };
          case (?r) {
            if (r.certificationId == certificationId) { ?r } else { null };
          };
        };
      }
    );
    callerResults.sort();
  };

  // Admin can view all test results for a certification across all users
  public query ({ caller }) func getAllTestResultsForCertification(certificationId : CertificationId) : async [TestResult] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all test results");
    };
    let filteredResults = testResults.values().toArray().filter(
      func(result : TestResult) : Bool {
        result.certificationId == certificationId;
      }
    );
    filteredResults.sort();
  };

  public shared ({ caller }) func addFlashcard(certificationId : CertificationId, front : Text, back : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add flashcards");
    };
    let newCard : Flashcard = {
      id = nextFlashcardId;
      front;
      back;
      timesCorrect = 0;
      timesIncorrect = 0;
    };
    nextFlashcardId += 1;
    let existingList = switch (flashcards.get(certificationId)) {
      case (null) { List.empty<Flashcard>() };
      case (?list) { list };
    };
    existingList.add(newCard);
    flashcards.add(certificationId, existingList);
  };

  public query ({ caller }) func getFlashcards(certificationId : CertificationId) : async [Flashcard] {
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can access flashcards");
    };
    switch (flashcards.get(certificationId)) {
      case (null) { Runtime.trap("No flashcards found for that certification") };
      case (?list) { list.toArray() };
    };
  };

  // Data Fetch Functions - require approved user or admin
  public query ({ caller }) func getDomains(certificationId : CertificationId) : async [Domain] {
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can access study content");
    };
    let allDomains = domains.values().toArray();
    allDomains.filter(
      func(domain : Domain) : Bool {
        domain.certificationId == certificationId;
      }
    );
  };

  public query ({ caller }) func getObjectives(domainId : DomainId) : async [Objective] {
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can access study content");
    };
    let allObjectives = objectives.values().toArray();
    allObjectives.filter(
      func(objective : Objective) : Bool {
        objective.domainId == domainId;
      }
    );
  };

  public query ({ caller }) func getKeyTerms() : async [KeyTerm] {
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can access study content");
    };
    keyTerms.values().toArray();
  };

  public query ({ caller }) func getPorts() : async [Port] {
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can access study content");
    };
    ports.values().toArray();
  };

  public query ({ caller }) func getProtocols() : async [Protocol] {
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can access study content");
    };
    protocols.values().toArray();
  };

  public query ({ caller }) func getCertifications() : async [Text] {
    if (not isApprovedOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Only approved users can access study content");
    };
    certifications.toArray();
  };

  // --- Security Improvements: Overwrite Payload Injection ---

  // Admin-only backdoor for overwriting test results (should be removed in production)
  public shared ({ caller }) func overwriteTestResults(_payload : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    Runtime.trap("Overwrite operation is not supported!");
  };
};
