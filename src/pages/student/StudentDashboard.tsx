import { Calendar, ClipboardList, FileText, Bell } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTimetable, mockAssignments, mockExamResults, mockAnnouncements } from '@/data/mockData';

export default function StudentDashboard() {
  const todayClasses = mockTimetable.filter(t => t.day === 'Monday' && t.class === 'Grade 6A');
  const myResults = mockExamResults.filter(r => r.studentId === 's1').slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Classes" value={todayClasses.length} icon={Calendar} variant="primary" />
        <StatCard title="Pending Assignments" value="2" icon={FileText} variant="warning" />
        <StatCard title="Average Score" value="82%" icon={ClipboardList} variant="success" />
        <StatCard title="New Notices" value="3" icon={Bell} variant="info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader><CardTitle>Today's Timetable</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {todayClasses.map((cls) => (
              <div key={cls.id} className="p-3 rounded-lg bg-primary/5 border border-primary/10 flex justify-between items-center">
                <div>
                  <p className="font-medium">{cls.subject}</p>
                  <p className="text-sm text-muted-foreground">{cls.teacher} • {cls.room}</p>
                </div>
                <Badge variant="secondary">{cls.time}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle>My Assignments</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockAssignments.map((a) => (
              <div key={a.id} className="p-3 rounded-lg bg-muted/50 border flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.subject} • Due: {a.dueDate}</p>
                </div>
                <Badge variant={a.status === 'Submitted' ? 'default' : 'secondary'}>{a.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle>Recent Exam Results</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {myResults.map((r) => (
              <div key={r.id} className="p-4 rounded-lg bg-muted/50 border text-center">
                <p className="text-2xl font-bold text-primary">{r.grade}</p>
                <p className="font-medium">{r.subject}</p>
                <p className="text-sm text-muted-foreground">{r.marks}/100</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
