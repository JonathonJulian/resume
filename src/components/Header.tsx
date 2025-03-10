import React, { useState, useEffect } from 'react';
import Icons from '../utils/icons';

interface HeaderProps {
  name: string;
  title: string;
  profileImage: string;
  summary: string;
  showTitle?: boolean;
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

const Header: React.FC<HeaderProps> = ({
  name,
  title,
  profileImage,
  summary,
  showTitle = false,
  contact
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [profileImage]);

  return (
    <header className="p-5 pb-6 md:p-6 md:pb-8 pt-8 rounded-lg bg-gradient-to-br from-[#1c1c1c] via-[#1e1e1e] to-[#242424] border border-[#2a2a2a] relative animate-fadeIn">
      {/* Background pattern */}
      <div className="absolute inset-0 top-0 opacity-5 pointer-events-none" style={{ zIndex: 0 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" className="absolute inset-0 top-0 w-full h-full">
          <rect width="100%" height="100%" fill="none" />
          <g fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3">
            <circle cx="150" cy="30" r="25" />
            <circle cx="550" cy="30" r="30" />
            <circle cx="950" cy="30" r="25" />
            <circle cx="150" cy="130" r="30" />
            <circle cx="550" cy="130" r="10" />
            <circle cx="950" cy="130" r="15" />
          </g>
          <g fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4,4" strokeOpacity="0.2">
            <line x1="0" y1="30" x2="1440" y2="30" />
            <line x1="0" y1="130" x2="1440" y2="130" />
            <line x1="150" y1="0" x2="150" y2="200" />
            <line x1="550" y1="0" x2="550" y2="200" />
            <line x1="950" y1="0" x2="950" y2="200" />
          </g>
        </svg>
      </div>

      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        {/* Profile Image */}
        {profileImage && (
          <div
            className="transition-all duration-300 hover:scale-105"
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'linear-gradient(45deg, rgba(74, 85, 104, 0.8), rgba(45, 55, 72, 0.8))',
              padding: '3px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(160, 174, 192, 0.3), 0 0 15px rgba(74, 85, 104, 0.3)',
              backgroundColor: '#1a1a1a',
              margin: '0 auto 10px auto',
              position: 'relative'
            }}
          >
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
              {imageError ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(75, 85, 99, 0.2)',
                    color: '#e2e8f0',
                    fontSize: '2.5rem',
                    fontWeight: 'bold'
                  }}
                >
                  {name.charAt(0)}
                </div>
              ) : (
                <img
                  src={profileImage}
                  alt={name}
                  className="profile-image transition-all duration-300 hover:brightness-110"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                width: '14px',
                height: '14px',
                backgroundColor: '#c0c0c0',
                borderRadius: '50%',
                border: '1px solid #1e1e1e',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {Icons.info('xxs')}
            </div>
          </div>
        )}

        {/* Name and Title */}
        <div className="animate-fadeIn" style={{ textAlign: 'center', margin: '0 0 24px 0' }}>
          <h1
            style={{
              fontSize: '3.2rem',
              fontWeight: '800',
              color: '#ffffff',
              lineHeight: '1.2',
              margin: '0 0 20px 0',
              letterSpacing: '0.5px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
            }}
          >
            {name}
          </h1>
          {showTitle && title && (
            <h2
              style={{
                fontSize: '1.8rem',
                color: '#c0c0c0',
                lineHeight: '1.3',
                fontWeight: '500',
                margin: 0,
                letterSpacing: '0.3px',
                textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 0.3)',
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
              }}
            >
              {title}
            </h2>
          )}
        </div>

        {/* Skill badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', margin: '0 0 28px 0' }}>
          <span
            className="px-4 py-2 rounded-lg text-sm text-white border flex items-center transition-all duration-300 hover:scale-105 hover:brightness-110 animate-fadeIn"
            style={{
              backgroundColor: 'rgba(45, 55, 72, 0.8)',
              borderColor: '#3a4a5a',
              animationDelay: '0.1s',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          >
            <span className="mr-2">🌐</span>
            <span>Blockchain</span>
          </span>
          <span
            className="px-4 py-2 rounded-lg text-sm text-white border flex items-center transition-all duration-300 hover:scale-105 hover:brightness-110 animate-fadeIn"
            style={{
              backgroundColor: 'rgba(45, 55, 72, 0.8)',
              borderColor: '#3a4a5a',
              animationDelay: '0.2s',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          >
            <span className="mr-2">🖥️</span>
            <span>Infrastructure</span>
          </span>
          <span
            className="px-4 py-2 rounded-lg text-sm text-white border flex items-center transition-all duration-300 hover:scale-105 hover:brightness-110 animate-fadeIn"
            style={{
              backgroundColor: 'rgba(45, 55, 72, 0.8)',
              borderColor: '#3a4a5a',
              animationDelay: '0.3s',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          >
            <span className="mr-2">👥</span>
            <span>Leadership</span>
          </span>
        </div>

        {/* Summary */}
        <div className="text-gray-300 text-base max-w-4xl mx-auto text-center mb-6 animate-fadeIn"
          style={{
            animationDelay: '0.4s',
            fontSize: '1.05rem',
            lineHeight: '1.6',
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
          }}
        >
          {summary}
        </div>

        {/* Divider */}
        <div
          className="animate-fadeIn"
          style={{
            width: '100%',
            maxWidth: '700px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #444, transparent)',
            margin: '0 0 5px 0',
            animationDelay: '0.4s'
          }}
        />

        {/* Contact and Social */}
        {contact && (
          <div className="flex flex-wrap justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
                style={{
                  color: '#a0a0a0',
                  padding: '10px',
                  borderRadius: '50%',
                  background: 'rgba(45, 55, 72, 0.6)',
                  border: '1px solid #3a4a5a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  fontSize: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                {Icons.github()}
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
                style={{
                  color: '#a0a0a0',
                  padding: '10px',
                  borderRadius: '50%',
                  background: 'rgba(45, 55, 72, 0.6)',
                  border: '1px solid #3a4a5a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  fontSize: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                {Icons.linkedin()}
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="transition-all duration-300 hover:scale-110"
                style={{
                  color: '#a0a0a0',
                  padding: '10px',
                  borderRadius: '50%',
                  background: 'rgba(45, 55, 72, 0.6)',
                  border: '1px solid #3a4a5a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  fontSize: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                {Icons.envelope()}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="transition-all duration-300 hover:scale-110"
                style={{
                  color: '#a0a0a0',
                  padding: '10px',
                  borderRadius: '50%',
                  background: 'rgba(45, 55, 72, 0.6)',
                  border: '1px solid #3a4a5a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  fontSize: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                {Icons.phone()}
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
                style={{
                  color: '#a0a0a0',
                  padding: '10px',
                  borderRadius: '50%',
                  background: 'rgba(45, 55, 72, 0.6)',
                  border: '1px solid #3a4a5a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  fontSize: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                {Icons.globe()}
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;