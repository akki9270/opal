const uuid = require("uuid");
const crypto = require("crypto");

module.exports = function (Sequelize, Types) {
  let Client = Sequelize.define(
    "Client",
    {
      id: {
        type: Types.UUID,
        defaultValue: Types.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      first_name: { type: Types.STRING, allowNull: false },
      last_name: { type: Types.STRING, allowNull: false },
      company_name: { type: Types.STRING },
      email: { type: Types.STRING, allowNull: false, unique: true },
      registration_date: { type: Types.TIME },
      street: { type: Types.STRING },
      house_number: { type: Types.INTEGER },
      area_code: { type: Types.INTEGER },
      city: { type: Types.STRING },
      country: { type: Types.STRING },
      phone: { type: Types.STRING },
      website: { type: Types.STRING },
      password: {
        type: Types.VIRTUAL,
        set(password) {
            if (!password) {
                throw new Error("Password must be provided");
            }
          let _password = password;
          let salt = uuid.v1();
          this._password = _password;
          this.salt = salt;
          let hashed_password = this.encryptPassword(password);
          this.hashed_password = hashed_password;
        },
        get() {
          return Client._password;
        },
       // allowNull: false,
        validate: { 
            isLongEnough: function (val) {
                console.log(' val ************* ', val);
                if (val.length < 7) {
                  throw new Error("Please choose a longer password")
               }
         }
        }
      },
      salt: Types.STRING,
      hashed_password: {  type: Types.STRING },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
      tableName: "Client",
      modelName: "Client",
      instanceMethods: {
          encryptPassword: function(password) {
              console.log('class Methods ', password, this)
          }
      }
    }
  );

  Client.prototype.encryptPassword = function (password) {
      if (!password) {
        return "";
      }
      try {
        let hashed = crypto
          .createHmac("sha1", this.salt)
          .update(password)
          .digest("hex");
          console.log('hashed ', hashed);
          return hashed;
      } catch (error) {
        return "";
      }
    }

    Client.prototype.isAuthenticate = function(plainText) {
      return this.encryptPassword(plainText) === this.hashed_password;
    }

    return Client;
};


//ElementDefinitionOptions
