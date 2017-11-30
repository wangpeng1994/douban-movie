requirejs.config({
  baseUrl: './src/js',
  paths: {
    'jquery': 'lib/jquery/jquery-3.2.1.min'
  }
})

requirejs(['app/app'])