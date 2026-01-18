import { Download, FileText, Users, DollarSign, Calendar, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const reports = [
  {
    id: 'r1',
    title: 'Student Academic Report',
    description: 'Individual student performance reports with grades and remarks',
    icon: Users,
    color: 'bg-primary/10 text-primary',
  },
  {
    id: 'r2',
    title: 'Fee Collection Report',
    description: 'Summary of fees collected, pending balances, and payment history',
    icon: DollarSign,
    color: 'bg-success/10 text-success',
  },
  {
    id: 'r3',
    title: 'Attendance Report',
    description: 'Daily, weekly, and monthly attendance statistics by class',
    icon: Calendar,
    color: 'bg-info/10 text-info',
  },
  {
    id: 'r4',
    title: 'Class Performance Analysis',
    description: 'Comparative analysis of exam performance across classes',
    icon: BarChart3,
    color: 'bg-warning/10 text-warning',
  },
  {
    id: 'r5',
    title: 'Teacher Workload Report',
    description: 'Teaching hours, class assignments, and subject allocation',
    icon: FileText,
    color: 'bg-accent/10 text-accent',
  },
  {
    id: 'r6',
    title: 'Transport Usage Report',
    description: 'Bus occupancy, route efficiency, and student assignments',
    icon: FileText,
    color: 'bg-purple-100 text-purple-700',
  },
];

export default function ReportsPage() {
  const handleGenerate = (title: string) => {
    toast.success(`Generating ${title}...`);
    setTimeout(() => {
      toast.success(`${title} is ready for download`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Generate and download various system reports</p>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${report.color}`}>
                  <report.icon className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{report.title}</CardTitle>
                  <CardDescription className="mt-1">{report.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleGenerate(report.title)}
              >
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
