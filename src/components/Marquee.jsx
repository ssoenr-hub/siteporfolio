import { Fragment } from 'react';

const ITEMS = ['Athletes', 'Événements', 'Automobile', 'Barber', 'Cinematic', 'Visuals', 'France', 'Europe'];

// CSS animation handles the scroll. Duplicate set so loop seamless.
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[...ITEMS, ...ITEMS].map((label, i) => (
          <Fragment key={i}>
            <span>{label}</span>
            <em>✦</em>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
