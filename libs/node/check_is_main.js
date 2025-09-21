/**
 * Check if the usage module is the `main` (entry point)
 * @param { string } metaUrl  `import.meta.url` value from the usage module
 * @returns { boolean }
 */
export function checkIsMain( metaUrl ) {
  let entryPath = process.argv[ 1 ]
  // Adding `.js` if not present
  if( !entryPath.endsWith( '.js' ) ) {  entryPath += '.js' }
  const entryUrl = `file://${ entryPath }`
  return entryUrl === metaUrl
}
