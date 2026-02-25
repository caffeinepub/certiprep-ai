import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Flashcard, Question, TestResult, PDFProgressRecord } from '../backend';

// ─── Flashcards ───────────────────────────────────────────────────────────────

export function useGetFlashcards(certificationId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Flashcard[]>({
    queryKey: ['flashcards', certificationId],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getFlashcards(certificationId);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!certificationId,
  });
}

export function useAddFlashcard() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      certificationId,
      front,
      back,
    }: {
      certificationId: string;
      front: string;
      back: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addFlashcard(certificationId, front, back);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['flashcards', variables.certificationId] });
    },
  });
}

// ─── Questions ────────────────────────────────────────────────────────────────

export function useGetQuestions(certificationId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Question[]>({
    queryKey: ['questions', certificationId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuestionsForCertification(certificationId);
    },
    enabled: !!actor && !isFetching && !!certificationId,
  });
}

export function useAddQuestion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      certificationId,
      domain,
      questionText,
      correctAnswer,
    }: {
      certificationId: string;
      domain: string;
      questionText: string;
      correctAnswer: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addQuestion(certificationId, domain, questionText, correctAnswer);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['questions', variables.certificationId] });
    },
  });
}

// ─── Test Results ─────────────────────────────────────────────────────────────

export function useGetTestResults(certificationId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<TestResult[]>({
    queryKey: ['testResults', certificationId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestResultsForCertification(certificationId);
    },
    enabled: !!actor && !isFetching && !!certificationId,
  });
}

export function useSubmitTestResult() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      certificationId,
      score,
      totalQuestions,
    }: {
      certificationId: string;
      score: number;
      totalQuestions: number;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitTestResult(certificationId, BigInt(score), BigInt(totalQuestions));
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['testResults', variables.certificationId] });
    },
  });
}

// ─── Reading Progress ─────────────────────────────────────────────────────────

export function useReadingProgress() {
  const { actor, isFetching } = useActor();

  return useQuery<PDFProgressRecord[]>({
    queryKey: ['readingProgress'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getMyPdfProgressRecords();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveReadingProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      certificationId,
      percentage,
    }: {
      certificationId: string;
      percentage: number;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.saveOrUpdateProgress(certificationId, BigInt(Math.round(percentage)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['readingProgress'] });
    },
  });
}
