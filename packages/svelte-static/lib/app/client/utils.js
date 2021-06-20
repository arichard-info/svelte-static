export const getPageProps = (path = '.') => {
	return typeof window !== 'undefined' &&
	fetch(path === '/' ? '/data.json' : `${path}/data.json`).then((res) => res.json());
}
