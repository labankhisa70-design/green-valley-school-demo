import { BookOpen, Users, ClipboardList, Calendar } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTimetable, mockAnnouncements, mockStudents } from '@/data/mockData';

export default function TeacherDashboard() {
  const todayClasses = mockTimetable.filter(t => t.day === 'Monday').slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="My Classes" value="6" icon={BookOpen} variant="primary" />
        <StatCard title="Total Students" value="156" icon={Users} variant="info" />
        <StatCard title="Pending Marks" value="12" icon={ClipboardList} variant="warning" />
        <StatCard title="Today's Classes" value="4" icon={Calendar} variant="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader><CardTitle>Today's Schedule</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {todayClasses.map((cls) => (
              <div key={cls.id} className="p-3 rounded-lg bg-muted/50 border flex justify-between items-center">
                <div>
                  <p className="font-medium">{cls.subject}</p>
                  <p className="text-sm text-muted-foreground">{cls.class} • {cls.room}</p>
                </div>
                <Badge>{cls.time}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader><CardTitle>Announcements</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockAnnouncements.slice(0, 3).map((a) => (
              <div key={a.id} className="p-3 rounded-lg bg-muted/50 border">
                <p className="font-medium text-sm">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
