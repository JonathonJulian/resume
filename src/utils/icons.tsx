import IconComponent from '../components/IconComponent';

type IconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

export const Icons = {
  email: (size: IconSize = 'md') => (
    <IconComponent size={size} viewBox="0 0 20 20" className="transition-transform hover:scale-110">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </IconComponent>
  ),

  phone: (size: IconSize = 'md') => (
    <IconComponent size={size} viewBox="0 0 20 20" className="transition-transform hover:scale-110">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </IconComponent>
  ),

  location: (size: IconSize = 'md') => (
    <IconComponent size={size} viewBox="0 0 20 20" className="transition-transform hover:scale-110">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </IconComponent>
  ),

  linkedin: (size: IconSize = 'md') => (
    <IconComponent size={size} viewBox="0 0 24 24" className="transition-transform hover:scale-110">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </IconComponent>
  ),

  github: (size: IconSize = 'md') => (
    <IconComponent size={size} viewBox="0 0 24 24" className="transition-transform hover:scale-110">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </IconComponent>
  ),

  website: (size: IconSize = 'md') => (
    <IconComponent size={size} viewBox="0 0 20 20" className="transition-transform hover:scale-110">
      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
    </IconComponent>
  ),

  kubernetes: (size: IconSize = 'md') => (
    <IconComponent size={size} viewBox="0 0 24 24" color="#4a5568" className="transition-transform hover:scale-110">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
      <path d="M15 6h-6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10h-6V8h6v8z" />
      <path d="M10 10h4v4h-4z" />
    </IconComponent>
  ),

  blockchain: (size: IconSize = 'md') => (
    <IconComponent size={size} viewBox="0 0 24 24" color="#4a5568" className="transition-transform hover:scale-110">
      <path d="M11 5h2v14h-2z" />
      <path d="M17.7 8.3l-1.4 1.4c1.2 1.2 1.2 3.2 0 4.4l1.4 1.4c2-2 2-5.3 0-7.2z" />
      <path d="M7.7 8.3c-2 2-2 5.2 0 7.2l1.4-1.4c-1.2-1.2-1.2-3.2 0-4.4L7.7 8.3z" />
      <path d="M4.6 5.2c-3.1 3.1-3.1 8.3 0 11.5l1.4-1.4c-2.3-2.3-2.3-6.2 0-8.6L4.6 5.2z" />
      <path d="M19.4 5.2l-1.4 1.4c2.3 2.4 2.3 6.3 0 8.6l1.4 1.4c3.1-3.1 3.1-8.3 0-11.4z" />
    </IconComponent>
  ),

  external: (size: IconSize = 'sm') => (
    <IconComponent size={size} viewBox="0 0 20 20" className="transition-transform">
      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
    </IconComponent>
  ),

  info: (size: IconSize = 'md') => (
    <IconComponent size={size} viewBox="0 0 24 24" color="#4a5568" className="transition-transform">
      <path d="M12 2L4.5 7v10L12 22l7.5-5V7L12 2z" />
      <path d="M9 16v-4h6v4l-2 2h-2l-2-2z" />
      <path d="M12 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </IconComponent>
  ),

  contact: (size: IconSize = 'md') => (
    <IconComponent size={size} viewBox="0 0 20 20" className="transition-transform hover:scale-110">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </IconComponent>
  )
};

export default Icons;