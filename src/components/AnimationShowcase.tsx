import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import AnimatedCounter from './AnimatedCounter';
import ProgressBar, { CircularProgress } from './ProgressBar';
import { SkeletonCard, SkeletonList, SkeletonDashboard } from './SkeletonLoader';

const AnimationShowcase: React.FC = () => {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [counterValue, setCounterValue] = useState(100);
  const [progressValue, setProgressValue] = useState(75);

  const triggerMicroAnimation = (className: string) => {
    const element = document.querySelector(`.${className}`);
    if (element) {
      element.classList.add(className);
      setTimeout(() => element.classList.remove(className), 1000);
    }
  };

  return (
    <div className="space-y-8 p-6 animate-fade-in">
      <Card title="Animation & Interactive Features Showcase" subtitle="Explore all the new animations and micro-interactions" variant="gradient" size="lg" className="text-white">
        <p className="text-white/90">
          This showcase demonstrates all the enhanced animations, hover effects, loading states, and micro-interactions added to the NexoraFlow dashboard.
        </p>
      </Card>

      {/* Button Animations */}
      <Card title="Enhanced Buttons" subtitle="Buttons with shimmer effects, hover animations, and micro-interactions">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="primary" className="hover-lift">
            Primary Button
          </Button>
          <Button variant="secondary" className="hover-grow">
            Secondary Button
          </Button>
          <Button variant="outline" className="hover-rotate">
            Outline Button
          </Button>
          <Button variant="ghost" className="hover-slide-right">
            Ghost Button
          </Button>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="success" loading>
            Loading Button
          </Button>
          <Button 
            variant="warning" 
            onClick={() => triggerMicroAnimation('micro-bounce')}
            className="micro-bounce-trigger"
          >
            Click for Bounce
          </Button>
        </div>
      </Card>

      {/* Card Animations */}
      <Card title="Interactive Cards" subtitle="Cards with hover effects, ripple animations, and shimmer effects">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default" hover clickable className="card-interactive">
            <h3 className="font-semibold mb-2">Default Card</h3>
            <p className="text-gray-600">Hover to see shimmer and ripple effects</p>
          </Card>
          
          <Card variant="elevated" hover className="hover-tilt">
            <h3 className="font-semibold mb-2">Elevated Card</h3>
            <p className="text-gray-600">This card tilts on hover</p>
          </Card>
          
          <Card variant="outlined" hover className="interactive-glow">
            <h3 className="font-semibold mb-2">Outlined Card</h3>
            <p className="text-gray-600">Glows on hover</p>
          </Card>
        </div>
      </Card>

      {/* Animated Counters */}
      <Card title="Animated Counters" subtitle="Numbers that animate when they change">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              <AnimatedCounter value={counterValue} />
            </div>
            <p className="text-sm text-gray-600">Basic Counter</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-success-600 mb-2">
              <AnimatedCounter value={counterValue * 10} prefix="$" separator="," />
            </div>
            <p className="text-sm text-gray-600">Currency Counter</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-warning-600 mb-2">
              <AnimatedCounter value={counterValue / 10} suffix="%" decimals={1} />
            </div>
            <p className="text-sm text-gray-600">Percentage Counter</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-error-600 mb-2">
              <AnimatedCounter value={counterValue * 1.5} duration={3000} />
            </div>
            <p className="text-sm text-gray-600">Slow Counter</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center space-x-4">
          <Button onClick={() => setCounterValue(Math.floor(Math.random() * 1000))}>
            Randomize Values
          </Button>
          <Button variant="outline" onClick={() => setCounterValue(0)}>
            Reset to Zero
          </Button>
        </div>
      </Card>

      {/* Progress Bars */}
      <Card title="Animated Progress Bars" subtitle="Progress indicators with smooth animations">
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Linear Progress Bars</h4>
            <div className="space-y-4">
              <ProgressBar value={progressValue} variant="default" showLabel showPercentage label="Default Progress" />
              <ProgressBar value={progressValue * 0.8} variant="success" showLabel showPercentage label="Success Progress" />
              <ProgressBar value={progressValue * 0.6} variant="warning" showLabel showPercentage label="Warning Progress" />
              <ProgressBar value={progressValue * 0.4} variant="error" showLabel showPercentage label="Error Progress" />
              <ProgressBar value={progressValue * 1.2} variant="gradient" showLabel showPercentage label="Gradient Progress" striped />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Circular Progress</h4>
            <div className="flex justify-center space-x-8">
              <CircularProgress value={progressValue} variant="default" showLabel label="Default" />
              <CircularProgress value={progressValue * 0.8} variant="success" showLabel label="Success" />
              <CircularProgress value={progressValue * 0.6} variant="warning" showLabel label="Warning" />
              <CircularProgress value={progressValue * 0.4} variant="gradient" showLabel label="Gradient" />
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button onClick={() => setProgressValue(Math.floor(Math.random() * 100))}>
              Randomize Progress
            </Button>
            <Button variant="outline" onClick={() => setProgressValue(100)}>
              Complete All
            </Button>
          </div>
        </div>
      </Card>

      {/* Loading Spinners */}
      <Card title="Loading Spinners" subtitle="Various loading indicators with animations">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          <div>
            <LoadingSpinner variant="spinner" size="lg" />
            <p className="text-sm text-gray-600 mt-2">Spinner</p>
          </div>
          <div>
            <LoadingSpinner variant="dots" size="lg" />
            <p className="text-sm text-gray-600 mt-2">Dots</p>
          </div>
          <div>
            <LoadingSpinner variant="pulse" size="lg" />
            <p className="text-sm text-gray-600 mt-2">Pulse</p>
          </div>
          <div>
            <LoadingSpinner variant="bars" size="lg" />
            <p className="text-sm text-gray-600 mt-2">Bars</p>
          </div>
          <div>
            <LoadingSpinner variant="ring" size="lg" />
            <p className="text-sm text-gray-600 mt-2">Ring</p>
          </div>
        </div>
      </Card>

      {/* Skeleton Loading States */}
      <Card title="Skeleton Loading States" subtitle="Placeholder content while data loads">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Skeleton Examples</h4>
            <Button 
              variant="outline" 
              onClick={() => setShowSkeleton(!showSkeleton)}
            >
              {showSkeleton ? 'Hide' : 'Show'} Skeletons
            </Button>
          </div>
          
          {showSkeleton ? (
            <div className="space-y-6">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-3">Skeleton Cards</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-3">Skeleton List</h5>
                <SkeletonList items={3} />
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-3">Skeleton Dashboard</h5>
                <SkeletonDashboard />
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Click "Show Skeletons" to see loading states
            </div>
          )}
        </div>
      </Card>

      {/* Micro-interactions */}
      <Card title="Micro-interactions" subtitle="Small animations that provide feedback">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            onClick={() => triggerMicroAnimation('micro-bounce')}
            className="micro-bounce-demo"
          >
            Bounce
          </Button>
          <Button 
            variant="outline" 
            onClick={() => triggerMicroAnimation('micro-shake')}
            className="micro-shake-demo"
          >
            Shake
          </Button>
          <Button 
            variant="outline" 
            onClick={() => triggerMicroAnimation('micro-flash')}
            className="micro-flash-demo"
          >
            Flash
          </Button>
          <Button 
            variant="outline" 
            onClick={() => triggerMicroAnimation('micro-rubber')}
            className="micro-rubber-demo"
          >
            Rubber
          </Button>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg hover-lift">
            <div className="w-12 h-12 bg-primary-100 rounded-full mx-auto mb-2 interactive-float"></div>
            <p className="text-sm">Floating Element</p>
          </div>
          <div className="text-center p-4 border rounded-lg hover-grow">
            <div className="w-12 h-12 bg-success-100 rounded-full mx-auto mb-2 interactive-pulse"></div>
            <p className="text-sm">Growing Element</p>
          </div>
          <div className="text-center p-4 border rounded-lg hover-rotate">
            <div className="w-12 h-12 bg-warning-100 rounded-full mx-auto mb-2 interactive-wiggle"></div>
            <p className="text-sm">Rotating Element</p>
          </div>
        </div>
      </Card>

      {/* Stagger Animations */}
      <Card title="Stagger Animations" subtitle="Elements that animate in sequence">
        <div className="stagger-children grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="outlined" hover>
            <h3 className="font-semibold mb-2">First Item</h3>
            <p className="text-gray-600">Animates first</p>
          </Card>
          <Card variant="outlined" hover>
            <h3 className="font-semibold mb-2">Second Item</h3>
            <p className="text-gray-600">Animates second</p>
          </Card>
          <Card variant="outlined" hover>
            <h3 className="font-semibold mb-2">Third Item</h3>
            <p className="text-gray-600">Animates third</p>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default AnimationShowcase;