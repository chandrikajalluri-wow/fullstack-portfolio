import React from 'react';
import Button from './Button';
import Header from './Header';
import Card from './Card';

const DemoPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <Header
        title="Component DemoPage"
        subtitle="Showing different prop combinations"
        level={1}
      />

      <Card title="Button Examples">
        <Button label="Default Button" />
        <Button label="Disabled Button" disabled={true} />
        <Button label="Submit Button" type="submit" />
      </Card>
      <Card title="Card Example">This is the children of this component</Card>

      <Card title="Nested Components Examples">
        <Header title="Inside Card with a h3 heading" level={3} />
        <p>This is a card with a nested header and button:</p>
        <Button label="Click Me" onClick={() => alert('Button clicked!')} />
      </Card>

      <Card content="This card only has content, no title" />
    </div>
  );
};

export default DemoPage;
