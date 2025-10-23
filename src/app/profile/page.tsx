
import Header from "@/components/layout/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Linkedin, Facebook, Instagram } from "lucide-react";

export default function ProfilePage() {
  const userAvatar = PlaceHolderImages.find(image => image.id === 'user-avatar');

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 md:p-8 flex justify-center items-start">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Manage your profile information and settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  {userAvatar && (
                    <AvatarImage src={userAvatar.imageUrl} alt={userAvatar.description} data-ai-hint={userAvatar.imageHint} />
                  )}
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Photo</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="user@example.com" />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Social Handles</Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="linkedin" placeholder="https://linkedin.com/in/..." className="pl-10" />
                </div>
                <div className="relative">
                  <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="facebook" placeholder="https://facebook.com/..." className="pl-10" />
                </div>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="instagram" placeholder="https://instagram.com/..." className="pl-10" />
                </div>
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
