'use client';
import { useState } from 'react';
import { Check, Mail, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function TestComponent() {
    const [email, setEmail] = useState('');
    const [notifications, setNotifications] = useState(false);

    return (
        <div className="min-h-screen from-slate-50 to-slate-100 p-8 flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Test Component
                    </CardTitle>
                    <CardDescription>
                        A simple component for testing purposes
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="test@example.com"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <div className="space-y-0.5">
                            <Label htmlFor="notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive email updates
                            </p>
                        </div>
                        <Switch
                            id="notifications"
                            checked={notifications}
                            onCheckedChange={setNotifications}
                        />
                    </div>

                    {notifications && (
                        <Badge variant="secondary" className="w-full justify-center">
                            <Check className="h-3 w-3 mr-1" />
                            Notifications Enabled
                        </Badge>
                    )}
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1 border-red-300 text-red-600 hover:bg-red-50">Cancel</Button>
                    <Button className="flex-1 bg-green-900 hover:bg-green-700 text-white">Save</Button>
                </CardFooter>
            </Card>
        </div>
    );
}