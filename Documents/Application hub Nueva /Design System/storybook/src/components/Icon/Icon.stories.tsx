import { useState, useMemo, useRef, useEffect } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { Icon, getAvailableIcons } from './Icon';

export default {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
An **Icon component** for displaying SVG icons in your application.

---

### ✨ Features

- ♿ **Accessible:** Proper roles and states for screen readers.
- 🎨 **Customizable:** Customize size and color with props.
- 📦 **Extensive library:** 129+ icons included locally in the package.
- 🔄 **Caching:** Icons are cached to improve performance.
- 🚀 **No dependencies:** All icons are bundled with the package.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { Icon } from './Icon';

<Icon name="add" />
<Icon name="arrow_back" size={24} />
<Icon name="education" size={32} color="#4CAF50" />
\`\`\`

Icons use snake_case naming convention. Examples: \`add\`, \`arrow_back\`, \`education\`, \`achievements\`, \`magic\`.
        `,
      },
    },
  },
} as Meta<typeof Icon>;

// Get the list of available icons dynamically from the component
const ICON_NAMES = getAvailableIcons() as readonly string[];

// Basic story example
export const Default: StoryFn<typeof Icon> = (args) => <Icon {...args} />;
Default.args = {
  name: 'add',
};

// Story with different sizes using the size prop
export const Sizes: StoryFn = () => (
  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <Icon name="add" size={16} />
      <span style={{ fontSize: '12px', color: '#666' }}>16px</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <Icon name="add" size={24} />
      <span style={{ fontSize: '12px', color: '#666' }}>24px</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <Icon name="add" size={32} />
      <span style={{ fontSize: '12px', color: '#666' }}>32px</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <Icon name="add" size={48} />
      <span style={{ fontSize: '12px', color: '#666' }}>48px</span>
    </div>
  </div>
);

// Story with different colors using the color prop
export const Colors: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h3
        style={{
          marginBottom: '16px',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        Colors with the color prop
      </h3>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Icon name="check_circle" size={32} color="#4CAF50" />
          <span style={{ fontSize: '12px', color: '#666' }}>Green</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Icon name="error" size={32} color="#F44336" />
          <span style={{ fontSize: '12px', color: '#666' }}>Red</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Icon name="info" size={32} color="#2196F3" />
          <span style={{ fontSize: '12px', color: '#666' }}>Blue</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Icon name="help" size={32} color="#FF9800" />
          <span style={{ fontSize: '12px', color: '#666' }}>Orange</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Icon name="star" size={32} color="#9C27B0" />
          <span style={{ fontSize: '12px', color: '#666' }}>Purple</span>
        </div>
      </div>
    </div>
    <div>
      <h3
        style={{
          marginBottom: '16px',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        Original colors (without the color prop)
      </h3>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Icon name="check_circle" size={32} />
          <span style={{ fontSize: '12px', color: '#666' }}>Original color</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Icon name="error" size={32} />
          <span style={{ fontSize: '12px', color: '#666' }}>Original color</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Icon name="info" size={32} />
          <span style={{ fontSize: '12px', color: '#666' }}>Original color</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Icon name="help" size={32} />
          <span style={{ fontSize: '12px', color: '#666' }}>Original color</span>
        </div>
      </div>
    </div>
  </div>
);
Colors.parameters = {
  docs: {
    description: {
      story:
        'Examples of icons with different colors using the `color` prop. When the `color` prop is not specified, icons keep their original colors.',
    },
  },
};

export const Gradient: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <h3
      style={{
        marginBottom: '8px',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '16px',
        fontWeight: '500',
      }}
    >
      Gradient examples
    </h3>
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Icon
          name="magic"
          size={40}
          color="linear-gradient(135deg, #42A5F5 0%, #7E57C2 50%, #EC407A 100%)"
        />
        <span style={{ fontSize: '12px', color: '#666' }}>Diagonal</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Icon
          name="star"
          size={40}
          color="radial-gradient(circle at 30% 30%, #FFE082 0%, #FFB300 45%, #FB8C00 100%)"
        />
        <span style={{ fontSize: '12px', color: '#666' }}>Radial</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Icon
          name="colors"
          size={40}
          color="linear-gradient(90deg, #26C6DA 0%, #66BB6A 50%, #D4E157 100%)"
        />
        <span style={{ fontSize: '12px', color: '#666' }}>Horizontal</span>
      </div>
    </div>
  </div>
);
Gradient.parameters = {
  docs: {
    description: {
      story:
        'The `color` prop accepts any valid CSS value, including `linear-gradient` and `radial-gradient`.',
    },
  },
};

// Story for the full icon library
export const IconLibrary: StoryFn = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('inherit');
  const [selectedSize, setSelectedSize] = useState<number>(24);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return ICON_NAMES;
    const query = searchQuery.toLowerCase();
    return ICON_NAMES.filter((name) => name.toLowerCase().includes(query));
  }, [searchQuery]);

  const handleCopy = (iconName: string) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    navigator.clipboard.writeText(iconName);
    setCopiedIcon(iconName);

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      setCopiedIcon(null);
      timeoutRef.current = null;
    }, 1500);
  };

  // Clear timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ position: 'relative', flex: '1', minWidth: '250px', maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxSizing: 'border-box',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '14px',
                outline: 'none',
                padding: '10px 16px 10px 40px',
                transition: 'border-color 0.2s ease',
                width: '100%',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1976d2';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999',
                pointerEvents: 'none',
                fontSize: '16px',
              }}
            >
              🔍
            </span>
          </div>
          <div
            style={{
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              color: '#666',
              display: 'flex',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              justifyContent: 'center',
              padding: '8px 16px',
              whiteSpace: 'nowrap',
              width: 'fit-content',
            }}
          >
            {filteredIcons.length} of {ICON_NAMES.length} icons
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', color: '#666' }}>
              Color
            </span>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxSizing: 'border-box',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '14px',
                outline: 'none',
                padding: '8px 12px',
                minWidth: '200px',
              }}
            >
              <option value="inherit">Original</option>
              <option value="#1976d2">Blue</option>
              <option value="#4caf50">Green</option>
              <option value="#f44336">Red</option>
              <option value="#ff9800">Orange</option>
              <option value="#9c27b0">Purple</option>
              <option value="linear-gradient(135deg, #42A5F5 0%, #7E57C2 50%, #EC407A 100%)">
                Diagonal gradient
              </option>
              <option value="radial-gradient(circle at 30% 30%, #FFE082 0%, #FFB300 45%, #FB8C00 100%)">
                Radial gradient
              </option>
              <option value="linear-gradient(90deg, #26C6DA 0%, #66BB6A 50%, #D4E157 100%)">
                Horizontal gradient
              </option>
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', color: '#666' }}>
              Size
            </span>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(Number(e.target.value))}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxSizing: 'border-box',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '14px',
                outline: 'none',
                padding: '8px 12px',
                minWidth: '140px',
              }}
            >
              <option value={16}>16px</option>
              <option value={20}>20px</option>
              <option value={24}>24px</option>
              <option value={32}>32px</option>
              <option value={40}>40px</option>
              <option value={48}>48px</option>
            </select>
          </label>
        </div>
        <p
          style={{
            fontFamily: 'Roboto, sans-serif',
            margin: '12px 0 0 0',
            color: '#666',
            fontSize: '14px',
          }}
        >
          Click any icon to copy its name to the clipboard
        </p>
      </div>

      {filteredIcons.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#999',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <div style={{ fontSize: '16px', fontWeight: '500' }}>No icons found</div>
          <div style={{ fontSize: '14px', marginTop: '8px' }}>Try another search term</div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '20px',
            padding: '20px 0',
          }}
        >
          {filteredIcons.map((iconName) => (
            <IconCard
              key={iconName}
              iconName={iconName}
              isCopied={copiedIcon === iconName}
              onCopy={handleCopy}
              color={selectedColor}
              size={selectedSize}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const IconCard = ({
  iconName,
  isCopied,
  onCopy,
  color,
  size,
}: {
  iconName: string;
  isCopied: boolean;
  onCopy: (name: string) => void;
  color: string;
  size: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 16px',
        border: `1px solid ${isCopied ? '#1976d2' : isHovered ? '#d0d0d0' : '#e0e0e0'}`,
        borderRadius: '12px',
        backgroundColor: isCopied ? '#e3f2fd' : isHovered ? '#ffffff' : '#fafafa',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 4px 12px rgba(0,0,0,0.08)'
          : isCopied
            ? '0 2px 8px rgba(25, 118, 210, 0.15)'
            : '0 1px 2px rgba(0,0,0,0.04)',
      }}
      onClick={() => onCopy(iconName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isCopied && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: '#1976d2',
            color: 'white',
            fontSize: '10px',
            padding: '4px 8px',
            borderRadius: '12px',
            fontWeight: '600',
            fontFamily: 'Roboto, sans-serif',
            animation: 'fadeIn 0.2s ease',
            zIndex: 1,
          }}
        >
          ✓ Copied
        </div>
      )}
      <div
        style={{
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px',
          transition: 'transform 0.2s ease',
        }}
      >
        <Icon name={iconName} size={size} color={color === 'inherit' ? undefined : color} />
      </div>
      <span
        style={{
          fontSize: '12px',
          fontWeight: '500',
          color: isCopied ? '#1976d2' : '#333',
          textAlign: 'center',
          lineHeight: '1.4',
          fontFamily: 'monospace',
          overflowWrap: 'anywhere',
          wordBreak: 'break-word',
          transition: 'color 0.2s ease',
        }}
      >
        {iconName}
      </span>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};
