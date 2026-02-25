import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export type TestId = bigint;
export type QuestionId = bigint;
export interface Port {
    id: PortId;
    protocol: string;
    service: string;
    description: string;
    portNumber: bigint;
}
export interface Domain {
    domainId: DomainId;
    domainName: string;
    certificationId: CertificationId;
    subdomains: Array<string>;
    description: string;
}
export type CertificationId = string;
export interface TestResult {
    certificationId: CertificationId;
    score: bigint;
    totalQuestions: bigint;
    timestamp: Time;
    testId: TestId;
}
export type KeyTermId = bigint;
export type ProtocolId = bigint;
export type ObjectiveId = bigint;
export type FlashcardId = bigint;
export type DomainId = bigint;
export interface Flashcard {
    id: FlashcardId;
    front: string;
    timesIncorrect: bigint;
    back: string;
    timesCorrect: bigint;
}
export type PortId = bigint;
export interface Question {
    id: QuestionId;
    domain: string;
    certificationId: CertificationId;
    correctAnswer: string;
    questionText: string;
}
export interface Objective {
    domainId: DomainId;
    difficulty: bigint;
    description: string;
    objectiveId: ObjectiveId;
}
export interface Protocol {
    id: ProtocolId;
    name: string;
    port?: bigint;
    description: string;
}
export interface KeyTerm {
    id: KeyTermId;
    term: string;
    definition: string;
}
export interface backendInterface {
    addDomain(certName: string, name: string, description: string, subdomains: Array<string>): Promise<DomainId>;
    addFlashcard(certificationId: CertificationId, front: string, back: string): Promise<void>;
    addKeyTerm(term: string, definition: string): Promise<KeyTermId>;
    addObjective(domainId: DomainId, description: string, difficulty: bigint): Promise<ObjectiveId>;
    addPort(portNumber: bigint, protocol: string, service: string, description: string): Promise<PortId>;
    addProtocol(name: string, description: string, port: bigint | null): Promise<ProtocolId>;
    addQuestion(certificationId: CertificationId, domain: string, questionText: string, correctAnswer: string): Promise<QuestionId>;
    getCertifications(): Promise<Array<string>>;
    getDomains(certificationId: CertificationId): Promise<Array<Domain>>;
    getFlashcards(certificationId: CertificationId): Promise<Array<Flashcard>>;
    getKeyTerms(): Promise<Array<KeyTerm>>;
    getObjectives(domainId: DomainId): Promise<Array<Objective>>;
    getPorts(): Promise<Array<Port>>;
    getProtocols(): Promise<Array<Protocol>>;
    getQuestionsForCertification(certificationId: CertificationId): Promise<Array<Question>>;
    getTestResultsForCertification(certificationId: CertificationId): Promise<Array<TestResult>>;
    submitTestResult(certificationId: CertificationId, score: bigint, totalQuestions: bigint): Promise<TestId>;
}
