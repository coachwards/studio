
'use client';
import { useState } from 'react';
import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Quadrant } from '@/lib/types';
import { Briefcase, HeartPulse, Landmark, Users } from 'lucide-react';

const initialQuadrants: Quadrant[] = [
    { id: 'health', title: 'Health & Wellness', icon: HeartPulse, color: 'text-red-400' },
    { id: 'work', title: 'Career & Work', icon: Briefcase, color: 'text-blue-400' },
    { id: 'finance', title: 'Finance & Investment', icon: Landmark, color: 'text-green-400' },
    { id: 'social', title: 'Social & Relationships', icon: Users, color: 'text-yellow-400' },
];

export default function CoachProfilePage() {
  const [coachName, setCoachName] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachName || !email || !specialty || !bio) {
      toast({
        variant: "destructive",
        title: "Incomplete Profile",
        description: "Please fill out all required fields to create your coach profile.",
      });
      return;
    }
    // Here you would typically send the data to your backend
    console.log({ coachName, email, specialty, bio, website });
    toast({
      title: "Profile Submitted!",
      description: "Thank you for submitting your coach profile. It will be reviewed shortly.",
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8 flex flex-col items-center gap-8">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Create Your Coach Profile</CardTitle>
            <CardDescription>
              Join the Coachwards platform as a professional coach and connect with users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="coachName">Full Name</Label>
                  <Input id="coachName" value={coachName} onChange={e => setCoachName(e.target.value)} placeholder="e.g., Alex Morgan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="e.g., alex.morgan@coaching.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Select onValueChange={setSpecialty} value={specialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your coaching specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {initialQuadrants.map(q => (
                      <SelectItem key={q.id} value={q.title}>{q.title}</SelectItem>
                    ))}
                     <SelectItem value="General">General Life Coaching</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea id="bio" value={bio} onChange={e => setBio(e.target.value)} placeholder="Describe your coaching philosophy, experience, and what makes you unique..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website or LinkedIn Profile</Label>
                <Input id="website" type="url" value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://linkedin.com/in/..." />
              </div>
              
              <div className="flex justify-end pt-4">
                 <Button type="submit">Submit Profile</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
