import controle from './accessControl';

const methods = {
    read: {
        all: 'readAny',
        yourself: 'readOwn'
    },
    create: {
        all: 'createAny',
        yourself: 'createOwn'
    },
    update: {
        all: 'updateAny',
        yourself: 'updateOwn'
    },
    delete: {
        all: 'deleteAny',
        yourself: 'deleteOwn'
    }
}

export function authorization (position: string, entity: string, action: string) {
    const permissionPosition = controle.can(position);
    
    const actions = methods[action];
    const permissionAll = permissionPosition[actions.all](entity);
    const permissionYourself = permissionPosition[actions.yourself](entity);

    if(permissionAll.granted === false && permissionYourself.granted === false) {
        throw {message: 'user not authorized'}
    }

    const result = {
        permission: {
            all: permissionAll.granted,
            yourself: permissionYourself.granted
        }
    }
    return result;
}