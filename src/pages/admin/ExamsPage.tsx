import { useState } from 'react';
import { Search, Plus, Edit, FileText, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { mockExams, mockExamResults, mockStudents, mockSubjects, calculateGrade } from '@/data/mockData';
import { toast } from 'sonner';

export default function ExamsPage() {
  const [selectedExam, setSelectedExam] = useState('e1');
  const [results, setResults] = useState(mockExamResults);
  const [isEntryDialogOpen, setIsEntryDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    studentId: '',
    subject: '',
    marks: '',
  });

  const filteredResults = results.filter(r => r.examId === selectedExam);

  const handleAddResult = () => {
    if (!newEntry.studentId || !newEntry.subject || !newEntry.marks) {
      toast.error('Please fill all fields');
      return;
    }

    const marks = parseInt(newEntry.marks);
    const grade = calculateGrade(marks);
    const student = mockStudents.find(s => s.id === newEntry.studentId);

    const result = {
      id: `r${results.length + 1}`,
      studentId: newEntry.studentId,
      studentName: student?.name || '',
      examId: selectedExam,
      subject: newEntry.subject,
      marks,
      grade,
      remarks: marks >= 80 ? 'Excellent' : marks >= 70 ? 'Very Good' : marks >= 60 ? 'Good' : 'Needs Improvement',
    };

    setResults([...results, result]);
    setIsEntryDialogOpen(false);
    setNewEntry({ studentId: '', subject: '', marks: '' });
    toast.success('Result added successfully');
  };

  const generateReportCard = (studentName: string) => {
    toast.success(`Report card generated for ${studentName}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Exams & Assessment</h1>
          <p className="text-muted-foreground">Manage exams and student results</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select exam" />
            </SelectTrigger>
            <SelectContent>
              {mockExams.map((exam) => (
                <SelectItem key={exam.id} value={exam.id}>{exam.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isEntryDialogOpen} onOpenChange={setIsEntryDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Enter Marks
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter Exam Marks</DialogTitle>
                <DialogDescription>
                  Record marks for a student
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Student</Label>
                  <Select 
                    value={newEntry.studentId} 
                    onValueChange={(v) => setNewEntry({ ...newEntry, studentId: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStudents.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select 
                    value={newEntry.subject} 
                    onValueChange={(v) => setNewEntry({ ...newEntry, subject: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSubjects.map((s) => (
                        <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Marks (out of 100)</Label>
                  <Input 
                    type="number"
                    min="0"
                    max="100"
                    value={newEntry.marks}
                    onChange={(e) => setNewEntry({ ...newEntry, marks: e.target.value })}
                    placeholder="Enter marks"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEntryDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddResult}>Save Result</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Exam Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockExams.map((exam) => (
          <Card 
            key={exam.id} 
            className={`shadow-card cursor-pointer transition-all ${selectedExam === exam.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setSelectedExam(exam.id)}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{exam.name}</h3>
                  <p className="text-sm text-muted-foreground">{exam.term}</p>
                </div>
                <Badge variant={exam.status === 'Completed' ? 'default' : 'secondary'}>
                  {exam.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Date: {exam.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Results Table */}
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Exam Results - {mockExams.find(e => e.id === selectedExam)?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-center">Marks</TableHead>
                <TableHead className="text-center">Grade</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.studentName}</TableCell>
                  <TableCell>{result.subject}</TableCell>
                  <TableCell className="text-center font-mono">{result.marks}</TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant={result.grade === 'A' ? 'default' : result.grade === 'B' ? 'secondary' : 'outline'}
                      className={result.grade === 'A' ? 'bg-success' : ''}
                    >
                      {result.grade}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{result.remarks}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => generateReportCard(result.studentName)}
                    >
                      <FileText className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredResults.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No results found for this exam
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
