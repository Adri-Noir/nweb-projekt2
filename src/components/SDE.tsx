import React from "react";
import styles from "../styles/SDE.module.css";
import { v4 as uuid } from "uuid";
import crypto from "crypto";

const SDE = () => {
  const [currentUUID, setCurrentUUID] = React.useState<string>(uuid());
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordHash, setPasswordHash] = React.useState<string>("");
  const [salt, setSalt] = React.useState<string>(
    crypto.randomBytes(16).toString("hex"),
  );
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [sdePrevention, setSdePrevention] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onLogin = () => {
    setLoading(true);
    const newUUID = uuid();
    const newSalt = crypto.randomBytes(16).toString("hex");
    setSalt(newSalt);
    setCurrentUUID(newUUID);
    crypto.pbkdf2(
      password,
      newSalt,
      100000,
      64,
      "sha512",
      (err, derivedKey) => {
        setLoading(false);
        if (err) throw err;
        setPasswordHash(derivedKey.toString("hex"));
        setLoggedIn(true);
      },
    );
  };

  return (
    <div className={styles.ssdContainer}>
      <div className={styles.ssdFormContainer}>
        <h3>Register!</h3>
        <label htmlFor={"username"}>Username</label>
        <input
          className={styles.ssdFormInput}
          name={"username"}
          type={"text"}
          onChange={(e) => {
            setUsername(e.target.value);
            setLoggedIn(false);
          }}
        />
        <label htmlFor={"password"}>Password</label>
        <input
          className={styles.ssdFormInput}
          name={"password"}
          type={"password"}
          onChange={(e) => {
            setPassword(e.target.value);
            setLoggedIn(false);
          }}
        />
        <button className={styles.ssdFormButton} onClick={onLogin}>
          Login
        </button>
        <label htmlFor={"sdePrevention"}>
          Sensitive Data Exposure Prevention
        </label>
        <input
          name={"sdePrevention"}
          type={"checkbox"}
          onChange={() => setSdePrevention(!sdePrevention)}
          checked={sdePrevention}
        />
      </div>
      <div className={"divider"} />
      {loggedIn && (
        <div className={styles.ssdFormContainer}>
          <h3>Welcome {username}!</h3>
          <p>Your database entry would be:</p>
          <code style={{ margin: "1rem" }}>
            id: {currentUUID} <br />
            username: {username} <br />
            password: {sdePrevention ? passwordHash : password} <br />
            {sdePrevention && <span>salt: {salt}</span>}
          </code>
          {sdePrevention && (
            <p>
              {
                "Your password is stored as a hash using PBKDF2 algorithm with salt and with 100k iterations, so even if someone gets access to the database, they won't be able to see your password!"
              }
            </p>
          )}
        </div>
      )}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default SDE;
