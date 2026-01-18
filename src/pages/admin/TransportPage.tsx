import { useState } from 'react';
import { Bus, MapPin, User, Phone, Users } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';
import { mockTransport, mockTransportAssignments } from '@/data/mockData';

export default function TransportPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Transport Management</h1>
        <p className="text-muted-foreground">Manage school buses and student routes</p>
      </div>

      {/* Bus Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockTransport.map((bus) => (
          <Card key={bus.id} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{bus.busNumber}</h3>
                  <p className="text-sm text-muted-foreground">{bus.route}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>Driver: {bus.driver}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{bus.phone}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      Capacity
                    </span>
                    <span>{bus.assigned}/{bus.capacity}</span>
                  </div>
                  <Progress value={(bus.assigned / bus.capacity) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Assignments Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Student Transport Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Bus</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Pickup Point</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransportAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.studentName}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{mockTransport.find(b => b.id === assignment.busId)?.busNumber}</Badge>
                  </TableCell>
                  <TableCell>{assignment.route}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      {assignment.pickupPoint}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
