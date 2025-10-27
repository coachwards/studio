
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

const rewardTypes = ['Voucher', 'Credits', 'Cash-back', 'Discount', 'Product'];

export default function BusinessProfilePage() {
  const [companyName, setCompanyName] = useState('');
  const [productName, setProductName] = useState('');
  const [contactName, setContactName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [description, setDescription] = useState('');
  const [quadrant, setQuadrant] = useState('');
  const [website, setWebsite] = useState('');
  const [rewardType, setRewardType] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !productName || !description || !quadrant || !website || !rewardType || !contactName || !businessEmail) {
      toast({
        variant: "destructive",
        title: "Incomplete Profile",
        description: "Please fill out all fields to create your profile.",
      });
      return;
    }
    // Here you would typically send the data to your backend
    console.log({ companyName, productName, contactName, businessEmail, description, quadrant, website, rewardType });
    toast({
      title: "Profile Submitted!",
      description: "Thank you for submitting your product profile. It will be reviewed shortly.",
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8 flex flex-col items-center gap-8">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Create Your Business Profile</CardTitle>
            <CardDescription>
              Showcase your product or service to motivated users on the Coachwards platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="e.g., Mindfulness Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productName">Product/Service Name</Label>
                  <Input id="productName" value={productName} onChange={e => setProductName(e.target.value)} placeholder="e.g., Mindful Moments App" />
                </div>
              </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input id="contactName" value={contactName} onChange={e => setContactName(e.target.value)} placeholder="e.g., Alex Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Business Email</Label>
                  <Input id="businessEmail" type="email" value={businessEmail} onChange={e => setBusinessEmail(e.target.value)} placeholder="e.g., contact@mindfulness.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe how your product helps users achieve their goals..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="quadrant">Relevant Quadrant</Label>
                  <Select onValueChange={setQuadrant} value={quadrant}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a goal quadrant" />
                    </SelectTrigger>
                    <SelectContent>
                      {initialQuadrants.map(q => (
                        <SelectItem key={q.id} value={q.title}>{q.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" type="url" value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="rewardType">Reward Type</Label>
                    <Select onValueChange={setRewardType} value={rewardType}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select a reward type" />
                        </SelectTrigger>
                        <SelectContent>
                        {rewardTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
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
