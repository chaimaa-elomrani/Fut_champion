
// const re = /^[0-9]$/
// re.exec(a)
// if(re.exec(a))
// {
//     console.log('kyna')
// }
// else{
//     console.log('mkynach')
// }
function check() {
    const value = document.getElementById('inoutt').value.trim()
    //    const re = /^(0[1-9]|[1-9][0-9]|100)$/

    // if(re.exec(value))
    // {
    //     console.log('valide')
    // }
    // else{
    //     console.log('invalide')
    // }
    const re = /^(https?:\/\/)/
    if (re.exec(value)) {
        console.log('valide')
    }
    else {
        console.log('invalide')
    }
}
// const a = 'Hamza GBOURI'
// const re = /^[a-z A-Z]*$/
// if(re.test(a))
// {
//     console.log('valide')
// }
// else{
//     console.log('invalide')
// }
