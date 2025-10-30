
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bot, ScanLine } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { runSwotAnalysis } from '@/ai/flows/run-swot-analysis';

export const SwotAnalysisDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const { toast } = useToast();

  const handleRunAnalysis = async () => {
    if (!userInput.trim()) {
      toast({
        variant: 'destructive',
        title: 'Input Required',
        description: 'Please tell me a bit about yourself before running the analysis.',
      });
      return;
    }

    setLoading(true);
    setAnalysisResult(null);

    try {
      const result = await runSwotAnalysis({ text: userInput });
      setAnalysisResult(result);
    } catch (error) {
      console.error('Failed to run SWOT analysis:', error);
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: 'Failed to perform the analysis. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <ScanLine className="mr-2" />
          Personal Goals Analyser
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot />
            AI-Powered User Analysis
          </DialogTitle>
          <DialogDescription>
            Share some information about your current situation, challenges, or goals. The AI will perform a simple SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis for you.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <Textarea
            placeholder="For example: 'I'm a software developer with 5 years of experience in frontend technologies. I want to move into a leadership role, but I lack management experience. The market is competitive, but my company is growing and offers internal mobility...'"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={5}
          />
          {loading && <p>Analyzing...</p>}
          {analysisResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-green-400">Strengths</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {analysisResult.strengths.map((item: string, index: number) => (
                    <li key={`s-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-red-400">Weaknesses</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {analysisResult.weaknesses.map((item: string, index: number) => (
                    <li key={`w-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-blue-400">Opportunities</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {analysisResult.opportunities.map((item: string, index: number) => (
                    <li key={`o-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-yellow-400">Threats</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {analysisResult.threats.map((item: string, index: number) => (
                    <li key={`t-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button onClick={handleRunAnalysis} disabled={loading}>
            {loading ? 'Analyzing...' : 'Run Analysis'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
