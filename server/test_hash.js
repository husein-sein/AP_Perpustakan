const bcrypt = require('bcryptjs');

async function test() {
    const password = 'password';
    const hash = await bcrypt.hash(password, 10);
    console.log('Hash generated:', hash);

    const isValid = await bcrypt.compare(password, hash);
    console.log('Is valid:', isValid);

    const isDoubleValid = await bcrypt.compare('password', hash);
    console.log('Is double valid:', isDoubleValid);
}

test();
