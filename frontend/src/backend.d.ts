import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface KeyTerm {
    id: KeyTermId;
    term: string;
    definition: string;
}
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
export interface PDFProgressRecord {
    userId: Principal;
    certificationId: CertificationId;
    percentage: bigint;
}
export interface TestResult {
    certificationId: CertificationId;
    score: bigint;
    totalQuestions: bigint;
    timestamp: Time;
    testId: TestId;
}
export type KeyTermId = bigint;
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
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
export type CertificationId = string;
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
export interface UserProfile {
    name: string;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addDomain(certName: string, name: string, description: string, subdomains: Array<string>): Promise<DomainId>;
    addFlashcard(certificationId: CertificationId, front: string, back: string): Promise<void>;
    addKeyTerm(term: string, definition: string): Promise<KeyTermId>;
    addObjective(domainId: DomainId, description: string, difficulty: bigint): Promise<ObjectiveId>;
    addPort(portNumber: bigint, protocol: string, service: string, description: string): Promise<PortId>;
    addProtocol(name: string, description: string, port: bigint | null): Promise<ProtocolId>;
    addQuestion(certificationId: CertificationId, domain: string, questionText: string, correctAnswer: string): Promise<QuestionId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllPdfProgressRecords(): Promise<Array<PDFProgressRecord>>;
    getAllTestResultsForCertification(certificationId: CertificationId): Promise<Array<TestResult>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCertifications(): Promise<Array<string>>;
    getDomains(certificationId: CertificationId): Promise<Array<Domain>>;
    getFlashcards(certificationId: CertificationId): Promise<Array<Flashcard>>;
    getKeyTerms(): Promise<Array<KeyTerm>>;
    getMyPdfProgressRecords(): Promise<Array<PDFProgressRecord>>;
    getObjectives(domainId: DomainId): Promise<Array<Objective>>;
    getPorts(): Promise<Array<Port>>;
    getProtocols(): Promise<Array<Protocol>>;
    getQuestionsForCertification(certificationId: CertificationId): Promise<Array<Question>>;
    getTestResultsForCertification(certificationId: CertificationId): Promise<Array<TestResult>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    overwriteTestResults(_payload: string): Promise<void>;
    requestApproval(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveOrUpdateProgress(certificationId: CertificationId, percentage: bigint): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    submitTestResult(certificationId: CertificationId, score: bigint, totalQuestions: bigint): Promise<TestId>;
}
