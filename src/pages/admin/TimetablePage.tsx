import { useState } from 'react';
import { Edit, Clock, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockTimetable, mockClasses } from '@/data/mockData';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [
  '8:00 - 9:00',
  '9:00 - 10:00',
  '10:30 - 11:30',
  '11:30 - 12:30',
  '2:00 - 3:00',
  '3:00 - 4:00',
];

const subjectColors: Record<string, string> = {
  'Mathematics': 'bg-primary/10 border-primary/20 text-primary',
  'English': 'bg-info/10 border-info/20 text-info',
  'Science': 'bg-success/10 border-success/20 text-success',
  'Social Studies': 'bg-warning/10 border-warning/20 text-warning',
  'Kiswahili': 'bg-accent/10 border-accent/20 text-accent',
  'ICT': 'bg-purple-100 border-purple-200 text-purple-700',
  'Physical Education': 'bg-orange-100 border-orange-200 text-orange-700',
};

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState('Grade 6A');
  
  const filteredTimetable = mockTimetable.filter(t => t.class === selectedClass);

  const getSlotContent = (day: string, time: string) => {
    return filteredTimetable.find(t => t.day === day && t.time === time);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Timetable</h1>
          <p className="text-muted-foreground">View and manage class schedules</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {mockClasses.map((cls) => (
                <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="p-3 font-semibold text-muted-foreground text-sm">Time</div>
            {days.map((day) => (
              <div key={day} className="p-3 text-center font-semibold bg-muted/50 rounded-lg">
                {day}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-6 gap-2 mb-2">
              <div className="p-3 flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                {time}
              </div>
              {days.map((day) => {
                const slot = getSlotContent(day, time);
                return (
                  <Card 
                    key={`${day}-${time}`} 
                    className={`min-h-[100px] ${slot ? subjectColors[slot.subject] || 'bg-muted/30' : 'bg-muted/20 border-dashed'}`}
                  >
                    <CardContent className="p-3">
                      {slot ? (
                        <div className="space-y-1">
                          <p className="font-semibold text-sm">{slot.subject}</p>
                          <div className="flex items-center gap-1 text-xs opacity-80">
                            <User className="w-3 h-3" />
                            {slot.teacher}
                          </div>
                          <div className="flex items-center gap-1 text-xs opacity-80">
                            <MapPin className="w-3 h-3" />
                            {slot.room}
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                          Free Period
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
