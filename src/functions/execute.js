'use strict';

async function execute (service) {
    const name = service.toString().slice(6, service.toString().lastIndexOf(" { /* */"));
    console.log(`${name}: running`);

    await new service()
        .then((response) => {
            console.log(`${name}: done (${response && response})`);
            return response;
        })
        .catch((error) => {
            console.error(`${name} (FATAL): ${error.stack}`)
            process.exit(1);
        });
};

export default execute;
