import { 
  Users, 
  UserCheck, 
  UsersRound, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  BookOpen,
  Bell
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  dashboardStats, 
  enrollmentByClass, 
  feeCollectionData, 
  examPerformanceData,
  mockAnnouncements 
} from '@/data/mockData';

const COLORS = ['hsl(142, 71%, 45%)', 'hsl(38, 92%, 50%)', 'hsl(199, 89%, 48%)'];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={dashboardStats.totalStudents.toLocaleString()}
          icon={Users}
          variant="primary"
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatCard
          title="Total Teachers"
          value={dashboardStats.totalTeachers}
          icon={UserCheck}
          variant="info"
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatCard
          title="Total Parents"
          value={dashboardStats.totalParents.toLocaleString()}
          icon={UsersRound}
          variant="success"
        />
        <StatCard
          title="Fee Collection (Term)"
          value={`KES ${(dashboardStats.feeCollectionTerm / 1000000).toFixed(1)}M`}
          icon={DollarSign}
          variant="warning"
          trend={{ value: 12.5, isPositive: true }}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance Today"
          value={`${dashboardStats.attendanceToday}%`}
          icon={Calendar}
        />
        <StatCard
          title="Total Classes"
          value={dashboardStats.totalClasses}
          icon={BookOpen}
        />
        <StatCard
          title="Pending Fees"
          value={`KES ${(dashboardStats.pendingFees / 1000).toLocaleString()}K`}
          icon={TrendingUp}
        />
        <StatCard
          title="Upcoming Events"
          value={dashboardStats.upcomingEvents}
          icon={Bell}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment by Class */}
        <ChartCard title="Student Enrollment by Class">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentByClass}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="class" 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="students" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Fee Collection */}
        <ChartCard title="Fee Collection Status">
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feeCollectionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {feeCollectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `KES ${value.toLocaleString()}`}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Exam Performance & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam Performance */}
        <ChartCard title="Exam Performance Overview">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={examPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="exam" 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgScore" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Recent Announcements */}
        <Card className="shadow-card animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAnnouncements.slice(0, 4).map((announcement) => (
              <div 
                key={announcement.id} 
                className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{announcement.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {announcement.content}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      announcement.priority === 'High' ? 'destructive' : 
                      announcement.priority === 'Medium' ? 'default' : 'secondary'
                    }
                    className="shrink-0 text-[10px]"
                  >
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">{announcement.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
