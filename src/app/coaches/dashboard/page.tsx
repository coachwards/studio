
'use client';

import { useState } from 'react';
import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Users, MessageSquare, Goal as GoalIcon } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

const mockClients = [
  { id: 'usr_1', name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80', recentGoal: 'Update resume for new career path', status: 'Needs Review', progress: 75, lastActivity: '2 hours ago' },
  { id: 'usr_2', name: 'Maria Garcia', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80', recentGoal: 'Complete daily meditation', status: 'Feedback Sent', progress: 100, lastActivity: '1 day ago' },
  { id: 'usr_3', name: 'David Smith', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80', recentGoal: 'Create monthly budget', status: 'Completed', progress: 100, lastActivity: '3 days ago' },
  { id: 'usr_4', name: 'Emily White', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80', recentGoal: 'Attend a networking event', status: 'Needs Review', progress: 50, lastActivity: '1 day ago' },
];

export default function CoachDashboardPage() {
  const [clients, setClients] = useState(mockClients);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null);
  const { toast } = useToast();

  const activeClients = clients.length;
  const feedbackSent = clients.filter(c => c.status === 'Feedback Sent' || c.status === 'Completed').length;
  const overallProgress = clients.reduce((acc, c) => acc + c.progress, 0) / activeClients;

  const handleSendFeedback = () => {
    if (!feedbackText || !selectedClient) return;
    
    // In a real app, you'd send this to the backend.
    console.log(`Sending feedback to ${selectedClient.name}: ${feedbackText}`);
    
    setClients(clients.map(c => 
      c.id === selectedClient.id ? { ...c, status: 'Feedback Sent' } : c
    ));
    
    toast({
      title: "Feedback Sent!",
      description: `Your feedback has been sent to ${selectedClient.name}.`
    });

    setSelectedClient(null);
    setFeedbackText('');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-8">
            <h1 className="font-headline text-3xl font-semibold">Coach Dashboard</h1>
            <p className="text-muted-foreground">Monitor client progress and provide guidance.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeClients}</div>
              <p className="text-xs text-muted-foreground">Clients you are currently coaching.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedback Sent</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedbackSent} / {activeClients}</div>
              <p className="text-xs text-muted-foreground">Clients you've recently given feedback to.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Client Progress</CardTitle>
              <GoalIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">Average completion across all client goals.</p>
            </CardContent>
          </Card>
        </div>
        
        <Dialog open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
          <Card>
              <CardHeader>
                  <CardTitle>Client Engagement</CardTitle>
                  <CardDescription>Review your clients' recent activities and provide feedback.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Table>
                      <TableHeader>
                          <TableRow>
                              <TableHead>Client</TableHead>
                              <TableHead>Recent Goal</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Last Activity</TableHead>
                              <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {clients.map(client => (
                              <TableRow key={client.id}>
                                  <TableCell>
                                      <div className="flex items-center gap-3">
                                          <Avatar className="h-10 w-10">
                                              <AvatarImage src={client.avatar} alt={client.name} />
                                              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                                          </Avatar>
                                          <span className="font-medium">{client.name}</span>
                                      </div>
                                  </TableCell>
                                  <TableCell>{client.recentGoal}</TableCell>
                                  <TableCell>
                                      <Badge variant={
                                        client.status === 'Needs Review' ? 'destructive' : 
                                        client.status === 'Feedback Sent' ? 'secondary' : 'default'
                                      }>
                                        {client.status}
                                      </Badge>
                                  </TableCell>
                                  <TableCell className="text-muted-foreground">{client.lastActivity}</TableCell>
                                  <TableCell className="text-right">
                                      <Button variant="outline" size="sm" onClick={() => setSelectedClient(client)} disabled={client.status !== 'Needs Review'}>
                                          Provide Feedback
                                      </Button>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </CardContent>
          </Card>
          
          {selectedClient && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Provide Feedback for {selectedClient.name}</DialogTitle>
                <div className="text-sm text-muted-foreground space-y-2 pt-2">
                   <p><span className="font-semibold">Goal:</span> {selectedClient.recentGoal}</p>
                   <p><span className="font-semibold">Progress:</span> {selectedClient.progress}%</p>
                </div>
              </DialogHeader>
              <div className="py-4">
                <Textarea 
                  placeholder="Type your encouraging and constructive feedback here..." 
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setSelectedClient(null)}>Cancel</Button>
                <Button onClick={handleSendFeedback}>Send Feedback</Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </main>
    </div>
  );
}
