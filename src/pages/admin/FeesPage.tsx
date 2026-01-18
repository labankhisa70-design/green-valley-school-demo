import { useState } from 'react';
import { Search, Plus, Download, Receipt, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockFeeStructure, mockFeePayments } from '@/data/mockData';
import { toast } from 'sonner';

export default function FeesPage() {
  const [payments, setPayments] = useState(mockFeePayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  const filteredPayments = payments.filter(p =>
    p.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCollected = payments.reduce((sum, p) => sum + p.amountPaid, 0);
  const totalPending = payments.reduce((sum, p) => sum + p.balance, 0);
  const paidCount = payments.filter(p => p.status === 'Paid').length;

  const handleRecordPayment = () => {
    if (!selectedStudent || !paymentAmount) {
      toast.error('Please select student and enter amount');
      return;
    }

    setPayments(payments.map(p => {
      if (p.studentId === selectedStudent) {
        const newPaid = p.amountPaid + parseInt(paymentAmount);
        const newBalance = p.totalFee - newPaid;
        return {
          ...p,
          amountPaid: newPaid,
          balance: newBalance,
          lastPayment: new Date().toISOString().split('T')[0],
          status: newBalance <= 0 ? 'Paid' : 'Partial',
        };
      }
      return p;
    }));

    setIsPaymentDialogOpen(false);
    setSelectedStudent(null);
    setPaymentAmount('');
    toast.success('Payment recorded successfully');
  };

  const generateReceipt = (studentName: string) => {
    toast.success(`Receipt generated for ${studentName}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Fees & Accounts</h1>
          <p className="text-muted-foreground">Manage fee collection and payments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Record Payment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record Fee Payment</DialogTitle>
                <DialogDescription>
                  Enter payment details below
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Student</Label>
                  <select 
                    className="w-full p-2 border rounded-lg"
                    value={selectedStudent || ''}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                  >
                    <option value="">Select student</option>
                    {payments.filter(p => p.balance > 0).map(p => (
                      <option key={p.studentId} value={p.studentId}>
                        {p.studentName} - Balance: KES {p.balance.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Amount (KES)</Label>
                  <Input 
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleRecordPayment}>Record Payment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">KES {(totalCollected / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Total Collected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">KES {(totalPending / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Pending Balance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{paidCount}/{payments.length}</p>
                <p className="text-sm text-muted-foreground">Fully Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="payments">
        <TabsList>
          <TabsTrigger value="payments">Payment Status</TabsTrigger>
          <TabsTrigger value="structure">Fee Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="mt-4 space-y-4">
          {/* Search */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search students..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Table */}
          <div className="rounded-xl border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead className="text-right">Total Fee</TableHead>
                  <TableHead className="text-right">Paid</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead>Last Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.studentName}</TableCell>
                    <TableCell>{payment.class}</TableCell>
                    <TableCell className="text-right">KES {payment.totalFee.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-success">KES {payment.amountPaid.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-destructive">
                      {payment.balance > 0 ? `KES ${payment.balance.toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell>{payment.lastPayment}</TableCell>
                    <TableCell>
                      <Badge variant={payment.status === 'Paid' ? 'default' : 'secondary'}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => generateReceipt(payment.studentName)}
                      >
                        <Receipt className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="structure" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Term Fee Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Amount (KES)</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFeeStructure.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell className="font-medium">{fee.name}</TableCell>
                      <TableCell>KES {fee.amount.toLocaleString()}</TableCell>
                      <TableCell>{fee.term}</TableCell>
                      <TableCell>
                        <Badge variant={fee.category === 'Mandatory' ? 'default' : 'secondary'}>
                          {fee.category}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
