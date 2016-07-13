import crypto from 'crypto';

class Random {
  id() {
    const current_date = (+new Date()).toString();
    const random = Math.random()
                       .toString();

    return crypto.createHash('sha1')
                 .update(current_date + random)
                 .digest('hex');
  }
}

export default new Random();
