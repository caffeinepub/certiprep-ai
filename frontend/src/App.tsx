import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CertificationSelector from './pages/CertificationSelector';
import StudyMode from './pages/StudyMode';
import QAPractice from './pages/QAPractice';
import Flashcards from './pages/Flashcards';
import PracticeTest from './pages/PracticeTest';

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

const certificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/certifications',
  component: CertificationSelector,
});

const studyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/study/$certificationId',
  component: StudyMode,
});

const practiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/practice/$certificationId',
  component: QAPractice,
});

const flashcardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/flashcards/$certificationId',
  component: Flashcards,
});

const testRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/test/$certificationId',
  component: PracticeTest,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  certificationsRoute,
  studyRoute,
  practiceRoute,
  flashcardsRoute,
  testRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
