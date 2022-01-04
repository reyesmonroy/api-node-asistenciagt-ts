import jwt from 'jsonwebtoken';

export const generarJWT = ( id: string ) => {
    return new Promise( (resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY || '', {
            expiresIn: '8h'
        }, ( err, token) => {
            if ( err ) {
                console.error(err);
                reject( 'No se pudo generar el token' );
            } else {
                resolve( token );
            }
        })
    })
}