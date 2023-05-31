import React from "react";
import ConsoleStore from "../../../store/ConsoleStore";
export const TextCollection = {
    TITLE:
        <>
            <span className="dyer-pink-gradient-1">   _____ ____  _   _  _____  ____  _      ______ </span>
            <span className="dyer-pink-gradient-2">  / ____/ __ \| \ | |/ ____|/ __ \| |    |  ____|</span>
            <span className="dyer-pink-gradient-3"> | |   | |  | |  \| | (___ | |  | | |    | |__   </span>
            <span className="dyer-pink-gradient-4"> | |   | |  | | . ` |\___ \| |  | | |    |  __|  </span>
            <span className="dyer-pink-gradient-5"> | |___| |__| | |\  |____) | |__| | |____| |____ </span>
            <span className="dyer-pink-gradient-6">  \_____\____/|_| \_|_____/ \____/|______|______| <span>WEB<sup className="dyer-yellow">.com</sup> console [<span className="dyer-red">{ConsoleStore.version}</span>]<sub>beta</sub></span></span>
            <span className="dyer-pink-gradient-1">  ____  _  _    _  _  __      __    ____   ____  __  __  ____  ____    ____    __    ____   ____  ____  _  _  </span>
            <span className="dyer-pink-gradient-2"> (  _ \( \/ )  ( \/ )(  )    /__\  (  _ \ (_  _)(  \/  )(_  _)(  _ \  ( ___)  /__\  (  _ \ ( ___)( ___)( \/ )</span>
            <span className="dyer-pink-gradient-3">  ) _ {'<'} \  /    \  /  )(__  /(__)\  )(_) ) _)(_  )    (  _)(_  )   /   )__)  /(__)\  )(_) ) )__)  )__)  \  / </span>
            <span className="dyer-pink-gradient-4"> (____/ (__)     \/  (____)(__)(__)(____/ (____)(_/\/\_)(____)(_)\_)  (__)  (__)(__)(____/ (____)(____)  \/  </span>
            <br></br>
        </>,
    ABOUT:
        <>
            <break></break>
            <br></br>
            <span className="dyer-cyan">Привет, добро пожаловать в консоль.</span>
            <span className="dyer-cyan">Подпишитесь на нас <a href="https://vk.com" target="blank" className="dyer-cyan link">VK</a>.</span>
            <br></br>
            <break></break>
        </>,
    HELP:
        <>
            <br></br>
            <span className="dyer-orange-gradient-1">┬ ┬┌─┐┬  ┌─┐ ┌─┐</span>
            <span className="dyer-orange-gradient-2">├─┤├┤ │  ├─┘  ┌┘</span>
            <span className="dyer-orange-gradient-3">┴ ┴└─┘┴─┘┴    o </span>
            <br></br>
            <break className="dyer-yellow">HELP <span className="dyer-purple">(Помощь нуждающимся)</span></break>
            <br></br>
            <span>Для каждой встроенной функции существует её более полное описание под флагом ? <span className="dyer-purple">(func -?)</span></span>
            <br></br>
            <span className="dyer-purple">Доступные команды:</span>
            <br></br>
            <span>help<span className="dyer-purple">.......................</span>возвращает список доступных команд;</span>
            <br></br>
            <span>get $argument<span className="dyer-purple">..............</span>возвращает значение константы $argument;</span>
            <br></br>
            <span>set $argument "text"<span className="dyer-purple">.......</span>устанавливает значение "text" для аргумента $argument;</span>
            <br></br>
            <span>clear<span className="dyer-purple">......................</span>очищает консоль;</span>
            <br></br>
            <span>open "text"<span className="dyer-purple">................</span>открывает ссылку "text";</span>
        </>,
    NEW_YEAR_TREE:
        <>
            <br></br>
            <span>           <span className="dyer-cyan">☆</span>           </span>
            <span>           *           </span>
            <span>          ***          </span>
            <span>         *****         </span>
            <span>        *******        </span>
            <span>       *********       </span>
            <span>      ***********      </span>
            <span>        *******        </span>
            <span>       *********       </span>
            <span>      ***********      </span>
            <span>     *************     </span>
            <span>    ***************    </span>
            <span>   *****************   </span>
            <span>     *************     </span>
            <span>    ***************    </span>
            <span>   *****************   </span>
            <span>  *******************  </span>
            <span> ********************* </span>
            <span>***********************</span>
            <span>          ***          </span>
            <span>          ***          </span>
            <br></br>
        </>
}