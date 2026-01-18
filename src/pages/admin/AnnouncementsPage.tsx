import { useState } from 'react';
import { Plus, Edit, Trash2, Bell, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockAnnouncements } from '@/data/mockData';
import { toast } from 'sonner';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'Medium',
    audience: 'All',
  });

  const handleAdd = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast.error('Please fill in all fields');
      return;
    }

    const announcement = {
      id: `an${announcements.length + 1}`,
      ...newAnnouncement,
      date: new Date().toISOString().split('T')[0],
    };

    setAnnouncements([announcement, ...announcements]);
    setIsDialogOpen(false);
    setNewAnnouncement({ title: '', content: '', priority: 'Medium', audience: 'All' });
    toast.success('Announcement published');
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    toast.success('Announcement deleted');
  };

  const sendNotification = (title: string) => {
    toast.success(`Notification sent for: ${title}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">Manage school announcements and notifications</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
              <DialogDescription>
                Publish a new announcement to the school community
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  placeholder="Announcement title"
                />
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea 
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                  placeholder="Write your announcement..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select 
                    value={newAnnouncement.priority}
                    onValueChange={(v) => setNewAnnouncement({ ...newAnnouncement, priority: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Audience</Label>
                  <Select 
                    value={newAnnouncement.audience}
                    onValueChange={(v) => setNewAnnouncement({ ...newAnnouncement, audience: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Students">Students</SelectItem>
                      <SelectItem value="Parents">Parents</SelectItem>
                      <SelectItem value="Teachers">Teachers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd}>Publish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    announcement.priority === 'High' ? 'bg-destructive/10' :
                    announcement.priority === 'Medium' ? 'bg-warning/10' : 'bg-muted'
                  }`}>
                    <Bell className={`w-5 h-5 ${
                      announcement.priority === 'High' ? 'text-destructive' :
                      announcement.priority === 'Medium' ? 'text-warning' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold">{announcement.title}</h3>
                      <Badge variant={
                        announcement.priority === 'High' ? 'destructive' :
                        announcement.priority === 'Medium' ? 'default' : 'secondary'
                      }>
                        {announcement.priority}
                      </Badge>
                      <Badge variant="outline">{announcement.audience}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{announcement.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">{announcement.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => sendNotification(announcement.title)}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(announcement.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
