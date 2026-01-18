import { User, ClipboardList, DollarSign, Calendar, Bell } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockExamResults, mockAnnouncements, mockFeePayments } from '@/data/mockData';

export default function ParentDashboard() {
  const childResults = mockExamResults.filter(r => r.studentId === 's1').slice(0, 4);
  const feeInfo = mockFeePayments.find(p => p.studentId === 's1');

  return (
    <div className="space-y-6">
      <Card className="shadow-card bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">John Mwangi</h2>
              <p className="text-muted-foreground">Grade 6A • Admission: GVS-2024-001</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Attendance" value="94%" icon={Calendar} variant="success" />
        <StatCard title="Average Grade" value="B+" icon={ClipboardList} variant="primary" />
        <StatCard title="Fee Balance" value={`KES ${feeInfo?.balance.toLocaleString()}`} icon={DollarSign} variant="warning" />
        <StatCard title="Notices" value="3" icon={Bell} variant="info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader><CardTitle>Recent Results</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {childResults.map((r) => (
              <div key={r.id} className="p-3 rounded-lg bg-muted/50 border flex justify-between items-center">
                <div>
                  <p className="font-medium">{r.subject}</p>
                  <p className="text-sm text-muted-foreground">{r.remarks}</p>
                </div>
                <Badge variant={r.grade === 'A' ? 'default' : 'secondary'}>{r.marks}% ({r.grade})</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader><CardTitle>School Notices</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockAnnouncements.filter(a => a.audience === 'Parents' || a.audience === 'All').slice(0, 3).map((a) => (
              <div key={a.id} className="p-3 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{a.title}</p>
                  <Badge variant={a.priority === 'High' ? 'destructive' : 'secondary'} className="text-xs">{a.priority}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{a.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
