
const colors = [
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose'
]

const shades = [
    300,
    400,
    500,
    600
]


export const colorGenerator = () => {

    const color = colors[ Math.floor( Math.random() * colors.length ) ];
    const shade = shades[ Math.floor( Math.random() * shades.length ) ];

    return `${color}-${shade}`;

}