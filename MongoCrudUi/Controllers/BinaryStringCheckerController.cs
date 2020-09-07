using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MongoCrudUi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BinaryStringCheckerController : ControllerBase
    {
        #region Task 2 Solution
        [Route("IsBinaryStringGood"), HttpGet]
        public ActionResult<bool> IsBinaryStringGood(string binaryString)
        {
            try
            {
                bool stringIsGood = false;

                // Number of Ones and Zeros are equal
                if (IsCountOfZeroEqualCountOfOne(binaryString))
                {
                    // Meets rule 1, thus far string is good.
                    stringIsGood = true;
                    for (int i = 0; i < binaryString.ToCharArray().Length; i++)
                    {
                        if (IsCountOfZeroGreaterThanOne(binaryString.Take(i + 1)))
                        {
                            // Breaks rule 2 hence string is bad.
                            stringIsGood = false;
                            break;
                        }
                    }
                }

                return stringIsGood;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// The function returns if the count of Zero is equal to the 
        /// count of one in any string. This checks if string meets rule
        /// one.
        /// </summary>
        /// <param name="strToCheck">String to check for counts</param>
        /// <returns>True if they are equal, false if they are not.</returns>
        private bool IsCountOfZeroEqualCountOfOne(string strToCheck)
        {
            int countOfZero = strToCheck.Count(x => x == '0');
            int countOfOne = strToCheck.Count(x => x == '1');

            return countOfZero == countOfOne;
        }

        /// <summary>
        /// For rule two. Checks if a substring has more zeros than ones.
        /// </summary>
        /// <param name="subStringToCheck">The substring to check</param>
        /// <returns>Returns true when 0 are more than ones, meaning string is bad, 
        /// and false when not meaning substring is good.
        /// </returns>
        private bool IsCountOfZeroGreaterThanOne(IEnumerable<char> subStringToCheck)
        {
            int countOfZero = subStringToCheck.Count(x => x == '0');
            int countOfOne = subStringToCheck.Count(x => x == '1');

            return countOfZero > countOfOne;
        }
        #endregion
    }
}
