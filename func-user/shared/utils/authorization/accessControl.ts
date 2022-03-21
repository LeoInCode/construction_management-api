import { AccessControl } from 'accesscontrol';
const controle = new AccessControl();

controle
    .grant('client')

    .readAny('user')
    .readAny('stage')
    .readAny('activity')
    .readAny('price')
    .readAny('information')

    .updateOwn('user')

controle
    .grant('employee')
    .extend('client')
    
    .updateOwn('information')

controle
    .grant('admin')
    .extend('client')

    .readAny('graphic')

    .createAny('stage')
    .createAny('activity')
    .createAny('price')
    .createAny('information')
    .createAny('graphic')

    .updateAny('construction')
    .updateAny('stage')
    .updateAny('activity')
    .updateAny('price')
    .updateAny('information')
    .updateAny('graphic')

    .deleteAny('construction')
    .deleteAny('stage')
    .deleteAny('activity')
    .deleteAny('price')
    .deleteAny('information')
    .deleteAny('graphic')

export default controle;