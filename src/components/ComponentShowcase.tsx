import React, { useState } from 'react';
import { Card, Button, LoadingSpinner } from './index';

const ComponentShowcase: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleCardClick = () => {
    setCardLoading(true);
    setTimeout(() => setCardLoading(false), 1500);
  };

  return (
    <div className="container-responsive section-padding">
      <div className="mb-8">
        <h1 className="heading-responsive font-bold text-gray-900 mb-4">
          Shared UI Components Showcase
        </h1>
        <p className="text-responsive text-gray-600">
          A demonstration of the shared UI components with various variants and states.
        </p>
      </div>

      {/* Card Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Card Components</h2>
        <div className="grid-responsive">
          <Card
            title="Default Card"
            subtitle="Basic card with default styling"
            variant="default"
          >
            <p className="text-gray-600">This is a default card with hover effects.</p>
          </Card>

          <Card
            title="Elevated Card"
            subtitle="Card with elevated shadow"
            variant="elevated"
          >
            <p className="text-gray-600">This card has a stronger shadow effect.</p>
          </Card>

          <Card
            title="Outlined Card"
            subtitle="Card with border outline"
            variant="outlined"
          >
            <p className="text-gray-600">This card uses a border instead of shadow.</p>
          </Card>

          <Card
            title="Gradient Card"
            subtitle="Card with gradient background"
            variant="gradient"
          >
            <p className="text-white/90">This card has a beautiful gradient background.</p>
          </Card>

          <Card
            title="Clickable Card"
            subtitle="Interactive card with click handler"
            variant="default"
            clickable
            onClick={handleCardClick}
            loading={cardLoading}
          >
            <p className="text-gray-600">Click me to see loading state!</p>
          </Card>

          <Card
            title="Large Card"
            subtitle="Card with larger padding"
            variant="filled"
            size="lg"
          >
            <p className="text-gray-600">This card has larger padding and filled background.</p>
          </Card>
        </div>
      </section>

      {/* Button Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Button Components</h2>
        <div className="space-y-6">
          <div className="flex-responsive">
            <Button variant="primary" onClick={handleButtonClick} loading={loading}>
              Primary Button
            </Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>

          <div className="flex-responsive">
            <Button variant="success" size="sm">Success Small</Button>
            <Button variant="warning" size="md">Warning Medium</Button>
            <Button variant="danger" size="lg">Danger Large</Button>
            <Button variant="primary" size="xl">Extra Large</Button>
          </div>

          <div className="flex-responsive">
            <Button variant="primary" disabled>Disabled Button</Button>
            <Button variant="outline" loading>Loading Button</Button>
            <Button variant="primary" fullWidth>Full Width Button</Button>
          </div>
        </div>
      </section>

      {/* Loading Spinner Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Loading Spinner Components</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="text-center">
            <LoadingSpinner variant="spinner" size="lg" />
            <p className="mt-2 text-sm text-gray-600">Spinner</p>
          </div>

          <div className="text-center">
            <LoadingSpinner variant="dots" size="lg" />
            <p className="mt-2 text-sm text-gray-600">Dots</p>
          </div>

          <div className="text-center">
            <LoadingSpinner variant="pulse" size="lg" />
            <p className="mt-2 text-sm text-gray-600">Pulse</p>
          </div>

          <div className="text-center">
            <LoadingSpinner variant="bars" size="lg" />
            <p className="mt-2 text-sm text-gray-600">Bars</p>
          </div>

          <div className="text-center">
            <LoadingSpinner variant="ring" size="lg" />
            <p className="mt-2 text-sm text-gray-600">Ring</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <LoadingSpinner 
            variant="spinner" 
            size="xl" 
            text="Loading content..." 
            color="primary"
          />
        </div>
      </section>

      {/* Responsive Design Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Responsive Design</h2>
        <Card title="Responsive Card" variant="default">
          <p className="text-responsive mb-4">
            This content adapts to different screen sizes using responsive utilities.
          </p>
          <div className="grid-responsive">
            <div className="bg-primary-100 content-padding rounded-lg">
              <p className="text-sm text-primary-800">Grid Item 1</p>
            </div>
            <div className="bg-secondary-100 content-padding rounded-lg">
              <p className="text-sm text-secondary-800">Grid Item 2</p>
            </div>
            <div className="bg-success-100 content-padding rounded-lg">
              <p className="text-sm text-success-800">Grid Item 3</p>
            </div>
            <div className="bg-warning-100 content-padding rounded-lg">
              <p className="text-sm text-warning-800">Grid Item 4</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default ComponentShowcase;