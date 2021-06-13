export const getPageProps = (path = '.') => {
    console.log(path)
	return typeof window !== 'undefined' &&
	fetch(path === '/' ? '/data.json' : `${path}/data.json`).then((res) => res.json());
}
