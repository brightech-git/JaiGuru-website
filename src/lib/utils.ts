const BASE_URL = 'https://bmgjewellers.com';

export function getProductImages(imagePath: string | string[]): string[] {
    try {
        // Parse ImagePath if it's a JSON string, otherwise use as is
        const paths = typeof imagePath === 'string' ? JSON.parse(imagePath) : imagePath;

        if (!Array.isArray(paths)) {
            console.warn('ImagePath is not an array:', imagePath);
            return [];
        }

        return paths.map((path: string) => {
            // If the path already contains 'https', return it as is
            if (path.startsWith('https')) {
                return path;
            }
            // Otherwise, prepend the base URL
            return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
        });
    } catch (error) {
        console.error('Error parsing ImagePath:', error, imagePath);
        return [];
    }
}
