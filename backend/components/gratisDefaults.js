module.exports = {
    gratisHandler : async (req, res) => {
        var burstedURL      = req.pathname.split('/');
        var reservedWord    = burstedURL[1];
        var action          = burstedURL[2];
        switch (action) {
            case 'app':
                await app(req, res);
            break;
        }
    }
}

const app = async (req, res) => {
    res.write('app');
}