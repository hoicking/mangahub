export default function buildTime () {

  return {
    name: 'rollup-plugin-buildtime',
    transform (code) {
      const constantCode  = `window.BUILD_TIME ='${new Date().toLocaleString()}'`;
      return code + constantCode
    },
    rennderChunk () {

      
    }
    
  }
}