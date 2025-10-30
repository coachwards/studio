
'use client';

import Header from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, CheckCircle } from "lucide-react";

const mockUserData = [
  { id: 'usr_1', name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80', goal: 'Use Mindful Moments App daily', completed: false, progress: 80, dateAdded: '2024-05-20' },
  { id: 'usr_2', name: 'Maria Garcia', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80', goal: 'Use Mindful Moments App daily', completed: true, progress: 100, dateAdded: '2024-05-18' },
  { id: 'usr_3', name: 'David Smith', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80', goal: 'Use Mindful Moments App for 100 days', completed: false, progress: 45, dateAdded: '2024-05-22' },
  { id: 'usr_4', name: 'Emily White', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80', goal: 'Complete meditation series in Mindful Moments App', completed: true, progress: 100, dateAdded: '2024-05-15' },
];


export default function BusinessDashboardPage() {
  const engagedUsers = mockUserData.length;
  const completedGoals = mockUserData.filter(u => u.completed).length;
  const completionRate = engagedUsers > 0 ? (completedGoals / engagedUsers) * 100 : 0;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-8">
            <h1 className="font-headline text-3xl font-semibold">Mindfulness Inc. Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's how your product is performing.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Engaged Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{engagedUsers}</div>
                    <p className="text-xs text-muted-foreground">Users with goals related to your product</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{completedGoals}</div>
                    <p className="text-xs text-muted-foreground">Goals completed by users</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Goal Completion Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{completionRate.toFixed(1)}%</div>
                     <p className="text-xs text-muted-foreground">Of goals related to your product</p>
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>User Progress</CardTitle>
                <CardDescription>Track how individual users are progressing with their goals related to your product.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">User</TableHead>
                            <TableHead>Goal</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[150px]">Progress</TableHead>
                            <TableHead>Date Added</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockUserData.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium">{user.goal}</TableCell>
                                <TableCell>
                                    <Badge variant={user.completed ? "default" : "secondary"} className={user.completed ? "bg-green-500/20 text-green-700" : ""}>
                                        {user.completed ? 'Completed' : 'In Progress'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Progress value={user.progress} aria-label={`${user.progress}% progress`} />
                                      <span className="text-xs text-muted-foreground">{user.progress}%</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{user.dateAdded}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

      </main>
    </div>
  );
}
