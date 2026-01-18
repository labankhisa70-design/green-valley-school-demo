import { useState } from 'react';
import { Search, Plus, Users, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockClasses } from '@/data/mockData';

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const primaryClasses = mockClasses.filter(c => c.level === 'Primary');
  const jsClasses = mockClasses.filter(c => c.level === 'Junior Secondary');

  const ClassCard = ({ cls }: { cls: typeof mockClasses[0] }) => (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{cls.name}</h3>
            <p className="text-sm text-muted-foreground">{cls.level}</p>
          </div>
          <Badge variant="secondary">Stream {cls.stream}</Badge>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold">{cls.students}</p>
              <p className="text-xs text-muted-foreground">Students</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-info" />
            </div>
            <div>
              <p className="text-sm font-medium truncate">{cls.classTeacher}</p>
              <p className="text-xs text-muted-foreground">Class Teacher</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Classes & Streams</h1>
          <p className="text-muted-foreground">Manage school classes and student assignments</p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Class
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search classes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="primary">
        <TabsList>
          <TabsTrigger value="primary">Primary (Grade 1-8)</TabsTrigger>
          <TabsTrigger value="junior">Junior Secondary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="primary" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {primaryClasses
              .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((cls) => (
                <ClassCard key={cls.id} cls={cls} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="junior" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {jsClasses
              .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((cls) => (
                <ClassCard key={cls.id} cls={cls} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
