"use client";
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";
import Footer from "src/components/Footer";
import WalletWrapper from "src/components/WalletWrapper";
import { useAccount } from "wagmi";
import LoginButton from "src/components/LoginButton";
import SignupButton from "src/components/SignupButton";
import { useMemo, useState } from "react";
import MarkdownRenderer from "src/components/MarkdownRenderer";
import TransactionWrapper from "src/components/TransactionWrapper";

export default function Page() {
  const { address } = useAccount();
  const articleBrief = useMemo(
    () =>
      `## Introduction
In a world driven by digital content, platforms like Medium have become a haven for readers and writers alike. These platforms thrive on subscriptions, allowing users to access a broad array of articles on diverse topics. However, not everyone wants or needs a full subscription, especially when their interest lies in reading just one or two articles. Micropayments, small and instant transactions for individual pieces of content, present a compelling alternative. They not only democratize access to knowledge but also provide a win-win model for readers, writers, and the platform itself.

## The Case for Micropayments

### 1. Bridging the Gap Between Content Creators and Readers
Micropayments create an equitable ecosystem where readers can pay for exactly what they consume. For a casual reader, the commitment of a monthly subscription can feel excessive, especially if their interests are sporadic or niche. Micropayments allow users to read a single article by paying a nominal fee, making high-quality content accessible without the barrier of a full subscription.

From the writer’s perspective, micropayments can serve as a direct metric of their content’s value. Writers can earn revenue directly proportional to their article's popularity, incentivizing quality over quantity. This mechanism can help writers cultivate a dedicated audience, even among those unwilling to subscribe.
`,
    [],
  );
  const article = useMemo(
    () =>
      `## Introduction
In a world driven by digital content, platforms like Medium have become a haven for readers and writers alike. These platforms thrive on subscriptions, allowing users to access a broad array of articles on diverse topics. However, not everyone wants or needs a full subscription, especially when their interest lies in reading just one or two articles. Micropayments, small and instant transactions for individual pieces of content, present a compelling alternative. They not only democratize access to knowledge but also provide a win-win model for readers, writers, and the platform itself.

## The Case for Micropayments

### 1. Bridging the Gap Between Content Creators and Readers
Micropayments create an equitable ecosystem where readers can pay for exactly what they consume. For a casual reader, the commitment of a monthly subscription can feel excessive, especially if their interests are sporadic or niche. Micropayments allow users to read a single article by paying a nominal fee, making high-quality content accessible without the barrier of a full subscription.

From the writer’s perspective, micropayments can serve as a direct metric of their content’s value. Writers can earn revenue directly proportional to their article's popularity, incentivizing quality over quantity. This mechanism can help writers cultivate a dedicated audience, even among those unwilling to subscribe.

### 2. Expanding Audience Reach
Subscriptions inherently limit access to a specific segment of users who are willing to commit financially. By implementing a micropayment system, platforms like Medium can tap into a vast audience of occasional readers. These are people who may not subscribe but are willing to pay for specific content that interests them.

Micropayments lower the barrier to entry for casual readers, encouraging more people to engage with the platform. This expanded reach benefits writers by providing greater exposure and potential revenue streams.

### 3. Enhancing Content Discovery
For many users, the decision to subscribe is preceded by a period of exploration. Readers may not be willing to subscribe without knowing whether the platform’s content aligns with their interests. Micropayments can act as a bridge, allowing users to test the waters without financial overcommitment.

This model not only drives traffic to individual articles but also fosters long-term engagement. Readers who find value in the content are more likely to return and may eventually opt for a full subscription, creating a natural progression from casual to loyal users.

### 4. Tackling Subscription Fatigue
In the age of subscription overload, where everything from entertainment to software demands monthly payments, users often experience “subscription fatigue.” Many consumers are wary of adding another recurring expense to their list. Micropayments offer an alternative that alleviates this fatigue. By paying per article, users can budget their spending without feeling tied down by another subscription.

## Implementation Challenges and Solutions

While the benefits of micropayments are clear, their implementation is not without challenges. For platforms like Medium, these hurdles include integrating a seamless payment system, ensuring fair pricing, and addressing concerns about user experience.

### 1. Seamless Payment Integration
To succeed, micropayment systems must be effortless. Platforms should employ technologies like digital wallets, cryptocurrency, or one-click payment solutions. The payment process should be so simple that it doesn’t disrupt the reading experience.

### 2. Pricing Strategy
Setting the right price is critical. Articles must be priced low enough to encourage purchases but high enough to make the model sustainable. Dynamic pricing, where the cost reflects factors like article length, quality, or popularity, can strike this balance.

### 3. Avoiding Paywall Fatigue
Micropayments should not replace the existing subscription model but complement it. Users who prefer full access can retain their subscriptions, while occasional readers can enjoy the flexibility of paying per article. Offering both options ensures inclusivity and maximizes revenue.

## Why Platforms Like Medium Need Micropayments

Medium’s current subscription model is effective for regular users, but it excludes potential readers who are unwilling to commit. Micropayments can fill this gap, creating a hybrid monetization strategy that benefits all stakeholders.

- **For Readers:** Affordable access to individual articles without committing to a subscription.
- **For Writers:** An additional revenue stream and a chance to connect with a broader audience.
- **For Medium:** Increased user engagement, diversified revenue, and a larger, more inclusive readership.

This approach aligns with the broader trend of personalization in digital experiences. Users want tailored solutions that cater to their specific needs, and micropayments offer precisely that.

## The Future of Knowledge Access

As digital platforms evolve, the demand for flexible payment models will only grow. Micropayments represent a step towards a more inclusive internet, where knowledge is accessible to all, regardless of financial or subscription barriers. Platforms like Medium have the opportunity to lead this charge, redefining how content is consumed and valued.

The implementation of micropayments is not just a financial strategy—it’s a commitment to inclusivity, accessibility, and innovation. By embracing this model, Medium and similar platforms can empower readers, support writers, and build a sustainable ecosystem for the future of digital content.

## Conclusion

Micropayments are more than just a trend—they’re a necessity in today’s digital landscape. They address the limitations of traditional subscription models, making high-quality content accessible to a broader audience. For platforms like Medium, the adoption of micropayments can revolutionize content consumption, benefiting readers, writers, and the platform itself. By prioritizing flexibility and accessibility, micropayments pave the way for a future where knowledge knows no barriers.
`,
    [],
  );

  const [hasAccess, setHasAccess] = useState(false);

  const verifyProof = async (proof: ISuccessResult) => {
    await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ proof, signal: address }),
    });
  };

  // TODO: Functionality after verifying
  const onSuccess = () => {
    alert("Success");
    setHasAccess(true);
  };

  // @ts-ignore
  return (
    <div className="flex h-full w-full flex-col px-2">
      <section className="mt-6 mb-6 flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-row items-center justify-between gap-2 md:gap-0">
          <span className="font-bold text-2xl">BetterMedium</span>
          <div className="flex items-center gap-3">
            <SignupButton />
            {!address && <LoginButton />}
          </div>
        </div>
      </section>
      <section className="max-w-[90%] mx-auto templateSection flex w-full flex-col items-center justify-center gap-4 rounded-xl px-2 py-4 md:grow">
        <h1 className="text-4xl font-bold text-center">
          The Power of Micropayments: Revolutionizing Access to Knowledge
        </h1>
        <MarkdownRenderer markdown={hasAccess ? article : articleBrief} />
        {!hasAccess && (
          <>
            {address ? (
              <div className="flex flex-wrap text-center">
                <div>
                  Verify your account by WorldCoin <br />
                  <div>
                    <IDKitWidget
                      app_id="app_staging_83b4654e03ce5f3b5a21d359e10c70c5"
                      action="verify"
                      signal={address}
                      verification_level={VerificationLevel.Device}
                      handleVerify={verifyProof}
                      onSuccess={onSuccess}
                    >
                      {({ open }) => (
                        <button
                          className="bg-gray-700 w-[250px] text-[white] rounded-xl py-3"
                          onClick={open}
                        >
                          Verify with World ID
                        </button>
                      )}
                    </IDKitWidget>
                  </div>
                </div>
                <div className="p-4">Or</div>
                <div>
                  Pay for the article
                  <TransactionWrapper
                    address={address}
                    onSuccess={() => setHasAccess(true)}
                  />
                </div>
              </div>
            ) : (
              <WalletWrapper
                className="w-[450px] max-w-full"
                text="Sign in to read more"
              />
            )}
          </>
        )}
      </section>
      <Footer />
    </div>
  );
}
