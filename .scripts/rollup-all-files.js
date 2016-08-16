const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const typescript = require('typescript')
const tsPlugin = require('rollup-plugin-typescript')({
  typescript: typescript
})
const rimraf = require('rimraf')
const uglify = require('uglify-js')


function isDirectory (pathname) {
  try {
    return fs.statSync(pathname).isDirectory()
  } catch (e) {
    return false
  }
}

function isFile (pathname) {
  try {
    return fs.statSync(pathname).isFile()
  } catch (e) {
    return false
  }
}

function getAllInDirectory (directory, cb) {
  const files = fs.readdirSync(directory)
  for (let i = 0; i < files.length; ++i) {
    const filename = path.basename(files[i])
    cb(filename)
  }
}

function toCamelCase (str) {
  // Lower cases the string
  return str.toLowerCase()
    // Replaces any - or _ characters with a space
    .replace(/[-_]+/g, ' ')
    // Removes any non alphanumeric characters
    .replace(/[^\w\s]/g, '')
    // Uppercases the first character in each group immediately following a space
    // (delimited by spaces)
    .replace(/ (.)/g, function ($1) { return $1.toUpperCase() })
    // Removes spaces
    .replace(/ /g, '')
}

function pathName (directory) {
  return directory.split('/').filter(Boolean)[-1]
}

function uglifyFile(entryFile, destFile) {
  fs.writeFileSync(destFile, uglify.minify('dist/' + entryFile, {
    comporess: {
      deadcode: true
    }
  }).code) 
}

function rollupFile(entryFile, nestedDirectoryName) {
  const fileName = path.basename(entryFile).replace(path.extname(entryFile), '')
  const base = path.join(
    process.cwd(),
    'dist/',
    nestedDirectoryName
  )
  const name = toCamelCase(fileName)
  const file = fileName === 'index' ? 'snabbdom' : fileName

  rollup.rollup({
    entry: entryFile,
    plugins: [ tsPlugin ]
  }).then(function (bundle) {
    return bundle.write({
      dest: path.join(base, file + '.js'),
      format: 'umd',
      moduleName: name,
      moduleId: name,
      sourceMap: true,
      sourceMapFile: path.join(base, file + '.js.map'), 
    })
  }).then(function () {
    uglifyFile(nestedDirectoryName + file + '.js', path.join(base, file + '.min.js'))
  })
}

function rollupDirectory(directory, nested = '') {
  getAllInDirectory(directory, function (name) {
    const fileOrDirectory = path.join(directory, name)

    if (isFile(fileOrDirectory)) {
      rollupFile(fileOrDirectory, nested)
    }
  })
}

rimraf(path.resolve('dist'), {}, function (err) {
  if (err) throw err

  rollupDirectory(path.resolve('src'), '')
  rollupDirectory(path.resolve('src/modules'), 'modules/')
  rollupDirectory(path.resolve('src/helpers'), 'helpers/')
})
