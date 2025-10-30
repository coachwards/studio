
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { ChevronDown, ScanLine } from 'lucide-react';
import { SwotAnalysisDialog } from '../dashboard/swot-analysis-dialog';


const Header = () => {
    const userAvatar = PlaceHolderImages.find(image => image.id === 'user-avatar');

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center">
                <div className="mr-4 flex items-center">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6 text-primary">
                          <rect width="256" height="256" fill="none"></rect>
                          <path d="M168,40.7a96,96,0,1,0,0,174.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></path>
                          <path d="M88,40.7a96,96,0,1,1,0,174.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></path>
                        </svg>
                        <span className="font-headline text-lg font-bold">Coachwards</span>
                    </Link>
                    <Separator orientation="vertical" className="h-6" />
                    <p className="ml-4 text-sm font-semibold text-accent">Your life, rewarded</p>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                       <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 text-green-500 transition-colors hover:text-green-600 font-semibold focus:outline-none">
                            For Business
                            <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Link href="/business/profile">
                                <DropdownMenuItem>Product/Service Profile</DropdownMenuItem>
                            </Link>
                             <Link href="/coaches/profile">
                                <DropdownMenuItem>Coach Profile</DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                       </DropdownMenu>
                    </nav>
                </div>
                <div className="flex items-center justify-end space-x-2">
                    <div className="hidden md:block">
                       <Button variant="outline">
                         <ScanLine className="mr-2" />
                         Personal Goals Analyser
                       </Button>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-10 w-10">
                                    {userAvatar && (
                                        <AvatarImage src={userAvatar.imageUrl} alt={userAvatar.description} data-ai-hint={userAvatar.imageHint} />
                                    )}
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">User</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        user@example.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href="/profile">
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                            </Link>
                             <Link href="/journal">
                                <DropdownMenuItem>Journal</DropdownMenuItem>
                            </Link>
                             <Link href="/business/dashboard">
                                <DropdownMenuItem>Business Dashboard</DropdownMenuItem>
                            </Link>
                             <Link href="/coaches/dashboard">
                                <DropdownMenuItem>Coach Dashboard</DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default Header;
