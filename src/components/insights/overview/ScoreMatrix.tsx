const ScoreMatrix = () => {
  return (
    <div className="w-full space-y-8 rounded-lg border px-6 py-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium md:text-xl">What is a good Lead-Rite score?</h2>
        <p className="text-base text-gray-600">
          Lead-Rite Scores measure the degree to which leaders are applying wiser leadership
          behaviours and principles aimed at engaging the hearts and minds of staff while focusing
          on making decisions for the greater good of the orgnaistion.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Top Quartile Scores */}
        <div className="flex flex-col items-start gap-4 rounded-lg bg-[#f2fffe] p-6 md:flex-row md:gap-8">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full bg-[#cff2ee] p-3 whitespace-nowrap">
              Top Quartile Scores
            </span>

            <span className="text-xl font-thin md:text-4xl">75%+</span>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-600 lg:text-base">
              Highly aligned leadership, who are open to new insights and usually collectively
              execute actions to achieve shared goals and objectives.
            </p>

            <ol className="list-disc pl-4 text-sm text-gray-600 lg:text-base">
              <li>Highly connected and engaged leadership group</li>
              <li>High levels of insights and execution</li>
              <li>High levels of well-being and achievement</li>
            </ol>
          </div>
        </div>

        {/* Upper-Mid-Quartile Scores */}
        <div className="flex flex-col items-start gap-4 rounded-lg bg-[#fffcf0] p-6 md:flex-row md:gap-8">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full bg-[#fff2c6] p-3 whitespace-nowrap">
              Upper-Mid-Quartile Scores
            </span>

            <span className="text-xl font-thin md:text-4xl">50% - 74%</span>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-600 lg:text-base">
              Highly aligned leadership, who are open to new insights and usually collectively
              execute actions to achieve shared goals and objectives.
            </p>

            <ol className="list-disc pl-4 text-sm text-gray-600 lg:text-base">
              <li>Highly connected and engaged leadership group</li>
              <li>High levels of insights and execution</li>
              <li>High levels of well-being and achievement</li>
            </ol>
          </div>
        </div>

        {/* Lower Mid-Quartile Scores */}
        <div className="flex flex-col items-start gap-4 rounded-lg bg-[#fff6f6] p-6 md:flex-row md:gap-8">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full bg-[#ffe8e8] p-3 whitespace-nowrap">
              Lower Mid-Quartile Scores
            </span>

            <span className="text-xl font-thin md:text-4xl">25% - 49%</span>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-600 lg:text-base">
              Leadership is sometimes aligned although not yet consistently open to new insights and
              able to consistently execute to collectively achieve shared goals and objectives.
            </p>

            <ul className="list-disc pl-4 text-sm text-gray-600 lg:text-base">
              <li>
                Leadership group is yet to consistently apply wiser leadership behaviours and
                principles
              </li>
              <li>Will experience average to lower levels of insights and execution</li>
              <li>Will inconsistently engage the hearts and minds of staff</li>
              <li>
                Significant opportunity to gain further insights and boost well-being through the
                increased application of wiser leadership behaviours and principles
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Quartile Scores */}
        <div className="flex flex-col items-start gap-4 rounded-lg bg-[#d9d2e84d] p-6 md:flex-row md:gap-8">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full bg-[#d9d2e8] p-3 whitespace-nowrap">
              Bottom Quartile Scores
            </span>

            <span className="text-xl font-thin md:text-4xl">0% - 24%</span>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-600 lg:text-base">
              It is highly likely leadership are working in silos and not applying wiser leadership
              behaviours and principles.
            </p>

            <ul className="list-disc pl-4 text-sm text-gray-600 lg:text-base">
              <li>
                Leader will more likely be experiencing personalised ways of working, creating more
                stress and anxiety in the workplace
              </li>
              <li>Leaders are yet to engage the hearts and minds of staff</li>
              <li>Highly likely performance metrics will be lower than required</li>
            </ul>
          </div>
        </div>

        {/* Second Part */}
        <div className="mt-2 flex flex-col gap-2">
          <h2 className="text-lg font-medium md:text-xl">
            Understanding and improving your Scores
          </h2>
          <p className="text-base text-gray-600">
            Lead-Rite scores can fluctuate over time depending on the level of leadership
            consistency and the degreee in which leaders are applying wiser leadership behaviours
            and principles
          </p>
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 gap-4">
          {/* High Lead-Rite Scores */}
          <div className="flex flex-col items-start gap-4 rounded-lg bg-[#f2fffe] p-6 md:gap-8">
            <p className="text-sm text-gray-600 lg:text-base">
              High Lead-Rite scores indicate wise leadership focused on achieving the
              organisation&apos;s purpose and objectives. Continue to:
            </p>

            <ul className="list-disc pl-4 text-sm text-gray-600 lg:text-base">
              <li>Encourage leaders to gain and apply insights</li>
              <li>Showcase achievements across the organisation</li>
              <li>
                Apply wiser leadership behaviours and principles to continue to engage staff hearts
                and minds
              </li>
            </ul>
          </div>

          {/* Upper Mid Quartile Scores */}
          <div className="flex flex-col items-start gap-4 rounded-lg bg-[#fffcf0] p-6 md:gap-8">
            <p className="text-sm text-gray-600 lg:text-base">
              Upper Mid Quartile Lead-Rite Scores suggest inconsistent application of wiser
              leadership behaviors and principles. Consider:
            </p>

            <ul className="list-disc pl-4 text-sm text-gray-600 lg:text-base">
              <li>Aligning leadership approaches</li>
              <li>Focus on applying wiser leadership behaviors and principles</li>
              <li>Engaging the workforce to focus on what matters most</li>
            </ul>
          </div>

          {/* Lower Quartile */}
          <div className="flex flex-col items-start gap-4 rounded-lg bg-[#fff6f6] p-6 md:gap-8">
            <p className="text-sm text-gray-600 lg:text-base">
              Lower Quartile Lead-Rite scores indicate a need to increase leader engagement, as
              leaders role-modeling desired behaviors is critical for organisational alignment.
              Consider:
            </p>

            <ul className="list-disc pl-4 text-sm text-gray-600 lg:text-base">
              <li>Encouraging leaders to consistently apply Lead-Rite behaviors and principles</li>
              <li>
                Reflecting on how Lead-Rite scores impact Work-Rite scores and workforce engagement
              </li>
              <li>Setting clear expectations and shared objectives for collective achievement</li>
            </ul>
          </div>

          {/* Bottom Quartile */}
          <div className="flex flex-col items-start gap-4 rounded-lg bg-[#d9d2e84d] p-6 md:gap-8">
            <p className="text-sm text-gray-600 lg:text-base">
              Bottom Quartile Scores suggest leadership are operating in personalised ways of
              working and not yet applying wiser leadership behaviours and principles. Consider:
            </p>

            <ul className="list-disc pl-4 text-sm text-gray-600 lg:text-base">
              <li>
                Setting expectations that all leaders are to participate in the Lead-Rite program as
                part of the ongoing Leadership Development.
              </li>
              <li>
                Hold leaders to account for engaging the hearts and minds of staff to collectively
                achieve agreed goals and monitor progress.
              </li>
              <li>
                Acknowledge and show appreciation when leaders are applying wiser leadership
                behaviours and principles
              </li>
              <li>
                Hold up behaviour of role models as examples of what you would like to see more of.
              </li>
              <li>Focus on what is being achieved.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreMatrix;
