import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentsPage from "./pages/admin/StudentsPage";
import TeachersPage from "./pages/admin/TeachersPage";
import ClassesPage from "./pages/admin/ClassesPage";
import TimetablePage from "./pages/admin/TimetablePage";
import FeesPage from "./pages/admin/FeesPage";
import TransportPage from "./pages/admin/TransportPage";
import ExamsPage from "./pages/admin/ExamsPage";
import ReportsPage from "./pages/admin/ReportsPage";
import AnnouncementsPage from "./pages/admin/AnnouncementsPage";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ParentDashboard from "./pages/parent/ParentDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout><AdminDashboard /></DashboardLayout></ProtectedRoute>} />
            <Route path="/admin/students" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout><StudentsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/admin/teachers" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout><TeachersPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/admin/classes" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout><ClassesPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/admin/timetable" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout><TimetablePage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/admin/fees" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout><FeesPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/admin/transport" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout><TransportPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/admin/exams" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout><ExamsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout><ReportsPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/admin/announcements" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout><AnnouncementsPage /></DashboardLayout></ProtectedRoute>} />
            
            {/* Teacher Routes */}
            <Route path="/teacher" element={<ProtectedRoute allowedRoles={['teacher']}><DashboardLayout><TeacherDashboard /></DashboardLayout></ProtectedRoute>} />
            <Route path="/teacher/*" element={<ProtectedRoute allowedRoles={['teacher']}><DashboardLayout><TeacherDashboard /></DashboardLayout></ProtectedRoute>} />
            
            {/* Parent Routes */}
            <Route path="/parent" element={<ProtectedRoute allowedRoles={['parent']}><DashboardLayout><ParentDashboard /></DashboardLayout></ProtectedRoute>} />
            <Route path="/parent/*" element={<ProtectedRoute allowedRoles={['parent']}><DashboardLayout><ParentDashboard /></DashboardLayout></ProtectedRoute>} />
            
            {/* Student Routes */}
            <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><DashboardLayout><StudentDashboard /></DashboardLayout></ProtectedRoute>} />
            <Route path="/student/*" element={<ProtectedRoute allowedRoles={['student']}><DashboardLayout><StudentDashboard /></DashboardLayout></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
